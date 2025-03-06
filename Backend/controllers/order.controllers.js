import {asyncHandler} from '../utils/AsyncHandler.js'
import AppError from '../utils/AppError.js';
import AppResponse from '../utils/AppResponse.js';
import Order from '../models/order.models.js';
import Product from '../models/product.models.js';
import Razorpay from 'razorpay';
import mongoose from 'mongoose';
import crypto from 'crypto'
import { configDotenv } from 'dotenv';

configDotenv()
/**
 * @Add Order 
 * @ROUTE @POST {{URL}}/api/user/add-order
 * @ACCESS Public
 */

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});




export const addOrder = asyncHandler(async (req, res, next) => {
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
console.log(paymentMethod)
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
      const totalAmount = parseInt(total)

      const razorpayOrder = await razorpay.orders.create({
        amount: totalAmount * 100,
        currency: 'INR'
      }).catch(error => {
       // console.log(error)
        throw new AppError('Razorpay order creation failed: ' + error.message, 500);
      });
      //console.log(razorpayOrder)

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
    console.log(razorpay_order_id,razorpay_payment_id,razorpay_signature)
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

``








/**
 * @Edit Order 
 * @ROUTE @PUT {{URL}}/api/user/edit-order/:orderId
 * @ACCESS Public
 */
export const editOrder = asyncHandler(async (req, res, next) => {
    const { orderId } = req.params;
    const { address, subtotal, tax, shippingCharges, discount, total, status, orderItems } = req.body;
    const userId = req.user.id;
  
    // Validate order ID
    if (!orderId) {
      return next(new AppError('Order ID is required', 400));
    }
  
    const existingOrder = await Order.findOne({ _id: orderId, user: userId });
    if (!existingOrder) {
      return next(new AppError('Order not found', 404));
    }
  
    try {
      // If orderItems are being updated, validate and handle stock changes
      if (orderItems && orderItems.length > 0) {
        // Validate new orderItems structure
        if (!orderItems.every(item => item.productId && item.quantity)) {
          return next(new AppError('Each order item must have productId and quantity', 400));
        }
  
        // First, return stock for existing order items
        for (const item of existingOrder.orderItems) {
          const product = await Product.findById(item.productId);
          if (product) {
            product.stock += item.quantity;
            await product.save();
          }
        }
  
        // Then validate and deduct stock for new order items
        for (const item of orderItems) {
          const product = await Product.findById(item.productId);
          if (!product) {
            throw new Error(`Product not found: ${item.productId}`);
          }
          if (product.stock < item.quantity) {
            throw new Error(`Insufficient stock for product: ${product.name}`);
          }
          product.stock -= item.quantity;
          await product.save();
        }
      }
  
      // Update order fields
      existingOrder.address = address || existingOrder.address;
      existingOrder.subtotal = subtotal || existingOrder.subtotal;
      existingOrder.tax = tax || existingOrder.tax;
      existingOrder.shippingCharges = shippingCharges || existingOrder.shippingCharges;
      existingOrder.discount = discount || existingOrder.discount;
      existingOrder.total = total || existingOrder.total;
      existingOrder.status = status || existingOrder.status;
      existingOrder.orderItems = orderItems || existingOrder.orderItems;
  
      await existingOrder.save();
      res.status(200).json(new AppResponse(200, existingOrder, 'Order updated successfully'));
    } catch (error) {
      // Rollback any stock changes if an error occurred
      if (orderItems) {
        // Return stock for new order items
        for (const item of orderItems) {
          const product = await Product.findById(item.productId);
          if (product) {
            product.stock += item.quantity;
            await product.save();
          }
        }
        // Deduct stock for original order items
        for (const item of existingOrder.orderItems) {
          const product = await Product.findById(item.productId);
          if (product) {
            product.stock -= item.quantity;
            await product.save();
          }
        }
      }
      return next(new AppError(error.message || 'Error updating order', 500));
    }
  });
  
  export const deleteOrder = asyncHandler(async (req, res, next) => {
    const { orderId } = req.params;
    const userId = req.user.id;
  
    // Validate order ID
    if (!orderId) {
      return next(new AppError('Order ID is required', 400));
    }
  
    try {
      const existingOrder = await Order.findOne({ _id: orderId, user: userId });
      if (!existingOrder) {
        return next(new AppError('Order not found', 404));
      }
  
      // Increase stock for each product in the order
      for (const item of existingOrder.orderItems) {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }
        product.stock += item.quantity;
        await product.save();
      }
  
      // Use deleteOne instead of remove (which is deprecated)
      await Order.deleteOne({ _id: orderId });
  
      res.status(200).json(new AppResponse(200, null, 'Order deleted successfully'));
    } catch (error) {
      return next(new AppError(error.message || 'Error deleting order', 500));
    }
  });
/**
 * @All Orders
 * @ROUTE @GET {{URL}}/api/user/all-orders/
 * @ACCESS Public
 */
export const allOrders = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { orderStatus, page = 1, limit = 10, sort = '-createdAt' } = req.query;

  // Base query object
  const query = { user: userId };

  // Add orderStatus filter if provided
  // Since orderStatus is in orderItems array, we need to use special MongoDB syntax
  if (orderStatus) {
    query['orderItems.orderStatus'] = orderStatus;
  }

  try {
    // Get filtered orders with pagination
    const orders = await Order.find(query)
      .populate('orderItems.productId')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalOrders = await Order.countDocuments(query);

    res.status(200).json(
      new AppResponse(
        200,
        {
          orders,
          pagination: {
            total: totalOrders,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalOrders / limit),
            limit: parseInt(limit)
          }
        },
        'Orders fetched successfully'
      )
    );
  } catch (error) {
    return next(new AppError('Error fetching orders', 500));
  }
});


/**
 * @Single Orders
 * @ROUTE @GET {{URL}}/api/user/get-order/:orderID
 * @ACCESS Public
 */
// Fetch a single order by ID
export const getOrderById = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const userId = req.user.id;

  // Validate order ID
  if (!orderId) {
    return next(new AppError('Order ID is required', 400));
  }

  const order = await Order.findOne({ _id: orderId, user: userId }).populate('orderItems.productId');
  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  res.status(200).json(new AppResponse(200, order, 'Order fetched successfully'));
});

export const getProductItemByOrderIdAndProductItemId = asyncHandler(async (req, res, next) => {
  const { orderId, productItemId } = req.params;
  const userId = req.user.id;

  // Validate order ID and product item ID
  if (!orderId || !productItemId) {
    return next(new AppError('Order ID and Product Item ID are required', 400));
  }

  const order = await Order.findOne({ _id: orderId, user: userId }).populate('orderItems.productId');
  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  const productItem = order.orderItems.find(item => item._id.toString() === productItemId);
  if (!productItem) {
    return next(new AppError('Product item not found in this order', 404));
  }

  res.status(200).json(new AppResponse(200, productItem, 'Product item fetched successfully'));
});


export const allAdminOrders = asyncHandler(async(req,res,next)=>{
  const { orderStatus, page = 1, limit = 10, sort = '-createdAt' } = req.query;

  // Base query object
  const query = {};

  // Add orderStatus filter if provided
  // Since orderStatus is in orderItems array, we need to use special MongoDB syntax
  if (orderStatus) {
    query['orderItems.orderStatus'] = orderStatus;
  }

  try {
    // Get filtered orders with pagination
    const orders = await Order.find(query)
      .populate('orderItems.productId')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalOrders = await Order.countDocuments(query);

    res.status(200).json(
      new AppResponse(
        200,
        {
          orders,
          pagination: {
            total: totalOrders,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalOrders / limit),
            limit: parseInt(limit)
          }
        },
        'Orders fetched successfully'
      )
    );
  } catch (error) {
    return next(new AppError('Error fetching orders', 500));
  }
})