export const addOrder1 = asyncHandler(async (req, res, next) => {
    const {
      address,
      subtotal,
      tax,
      shippingCharges,
      discount,
      couponDiscount,
      total,
      orderItems,
      paymentMethod
    } = req.body;
    const userId = req.user.id;
  
    // Early validation
    if (!address || !total || !orderItems || !paymentMethod || orderItems.length === 0) {
      return next(new AppError('All fields are required', 400));
    }
  
    if (!['COD', 'ONLINE'].includes(paymentMethod)) {
      return next(new AppError('Invalid payment method', 400));
    }
  
    if (!orderItems.every(item => item.productId && item.quantity > 0)) {
      return next(new AppError('Each order item must have valid productId and quantity', 400));
    }
  
    // Extract all product IDs
    const productIds = orderItems.map(item => item.productId);
  
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      // Fetch all products in one query
      const products = await Product.find({ 
        _id: { $in: productIds } 
      }).session(session);
  
      if (products.length !== productIds.length) {
        throw new AppError('One or more products not found', 404);
      }
  
      // Create a map for quick product lookup
      const productMap = products.reduce((map, product) => {
        map[product._id.toString()] = product;
        return map;
      }, {});
  
      // Validate stock and prepare order items
      const preparedOrderItems = orderItems.map(item => {
        const product = productMap[item.productId];
        
        if (product.stock < item.quantity) {
          throw new AppError(`Insufficient stock for product: ${product.name}`, 400);
        }
  
        return {
          ...item,
          name: product.name,
          photo: product.photo,
          price: product.price,
          productId: product._id,
          orderStatus: product.orderStatus || 'Pending',
          paymentStatus: product.paymentStatus || 'Pending',
          orderDate: new Date()
        };
      });
  
      // Update product stock in bulk
      const bulkUpdateOps = orderItems.map(item => ({
        updateOne: {
          filter: { _id: item.productId },
          update: { $inc: { stock: -item.quantity } }
        }
      }));
  
      await Product.bulkWrite(bulkUpdateOps, { session });
  
      let orderData = {
        address,
        user: userId,
        subtotal,
        tax,
        shippingCharges,
        discount,
        total,
        paymentMethod,
        couponDiscount,
        orderItems: preparedOrderItems
      };
  
      if (paymentMethod === 'ONLINE') {
        const razorpayOrder = await razorpay.orders.create({
          amount: total * 100,
          currency: 'INR'
        }).catch(error => {
          throw new AppError('Razorpay order creation failed: ' + error.message, 500);
        });
  
        orderData.razorpay = {
          orderId: razorpayOrder.id
        };
      }
  
      const order = new Order(orderData);
      await order.save({ session });
      await session.commitTransaction();
  
      if (paymentMethod === 'ONLINE') {
        return res.status(200).json(new AppResponse(200, {
          order,
          razorpayOrderId: order.razorpay.orderId,
          razorpayKeyId: razorpay.key_id
        }, 'Order created successfully, proceed with payment'));
      }
  
      return res.status(200).json(
        new AppResponse(200, order, 'Order placed successfully via Cash on Delivery')
      );
  
    } catch (error) {
      await session.abortTransaction();
      console.error('Order processing error:', error);
      return next(error instanceof AppError ? error : new AppError(error.message || 'Error processing order', 500));
    } finally {
      session.endSession();
    }
  });
  
  // Add this new controller method for handling payment verification
  export const verifyOrderPayment = asyncHandler(async (req, res, next) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return next(new AppError('Payment verification failed: Missing required fields', 400));
    }
  
    try {
      // Verify the payment signature
      const body = razorpay_order_id + '|' + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac('sha256', '0NQdt2hWDAoQyYg1xuydWBwe')
        .update(body.toString())
        .digest('hex');
  
      if (expectedSignature !== razorpay_signature) {
        return next(new AppError('Payment verification failed: Invalid signature', 400));
      }
  
      // Update order with payment details
      const order = await Order.findOneAndUpdate(
        { 'razorpay.orderId': razorpay_order_id },
        {
          $set: {
            'razorpay.paymentId': razorpay_payment_id,
            'razorpay.signature': razorpay_signature,
            'orderItems.$[].paymentStatus': 'Paid'
          }
        },
        { new: true }
      );
  
      if (!order) {
        return next(new AppError('Order not found', 404));
      }
  
      res.status(200).json(new AppResponse(200, order, 'Payment verified successfully'));
    } catch (error) {
      return next(new AppError('Error verifying payment: ' + error.message, 500));
    }
  });