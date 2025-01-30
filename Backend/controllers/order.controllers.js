import {asyncHandler} from '../utils/AsyncHandler.js'
import AppError from '../utils/AppError.js';
import AppResponse from '../utils/AppResponse.js';
import Order from '../models/order.models.js';
import Product from '../models/product.models.js';
import Razorpay from 'razorpay';
import mongoose from 'mongoose';
import crypto from 'crypto'
/**
 * @Add Order 
 * @ROUTE @POST {{URL}}/api/user/add-order
 * @ACCESS Public
 */

const razorpay = new Razorpay({
  key_id: 'rzp_test_4pXWRuOFyNs2sh',
  key_secret: '0NQdt2hWDAoQyYg1xuydWBwe',
});




export const addOrder = asyncHandler(async (req, res, next) => {
  const {
    address,
    subtotal,
    tax,
    couponDiscount,
    shippingCharges,
    discount,
    total,
    orderItems,
  } = req.body;
  console.log(couponDiscount)

  const userId = req.user.id;

  // Early validation
  if (!address || !total || !orderItems || orderItems.length === 0) {
    return next(new AppError('All fields are required', 400));
  }

  // Validate order items
  if (!orderItems.every(item => item.productId && item.quantity > 0)) {
    return next(new AppError('Each order item must have valid productId and quantity', 400));
  }

  // Extract all product IDs
  const productIds = orderItems.map(item => item.productId);

  // Start transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Fetch all products in one query
    const products = await Product.find({
      _id: { $in: productIds }
    }).session(session);

    // Verify all products exist
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
      
      // Check stock availability
      if (product.stock < item.quantity) {
        throw new AppError(`Insufficient stock for product: ${product.name}`, 400);
      }

      // Prepare order item with product details
      return {
        ...item,
        name: product.name,
        photo: product.photo,
        price: product.price,
        productId: product._id,
        orderStatus: 'Processing', // Default status
        paymentStatus: 'Pending',  // Default payment status
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

    // Create order
    const orderData = {
      address,
      user: userId,
      subtotal,
      tax,
      shippingCharges,
      discount,
      total,
      couponDiscount,
      paymentMethod: 'COD',
      orderItems: preparedOrderItems
    };

    const order = new Order(orderData);
    await order.save({ session });

    // Commit transaction
    await session.commitTransaction();

    return res.status(200).json(
      new AppResponse(200, order, 'Order placed successfully via Cash on Delivery')
    );

  } catch (error) {
    // Rollback transaction on error
    await session.abortTransaction();
    console.error('Order processing error:', error);
    return next(error instanceof AppError ? error : new AppError(error.message || 'Error processing order', 500));
  } finally {
    session.endSession();
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