import Cart from '../models/cart.models.js';
import Product from '../models/product.models.js';
import {asyncHandler} from '../utils/AsyncHandler.js'
import AppError from '../utils/AppError.js';
import User from '../models/user.models.js';

// Add item to cart
export const addItemToCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;
  console.log(productId)

  // Validate product and quantity
  if (!productId || !quantity) {
    return next(new AppError('Product ID and quantity are required', 400));
  }

  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  // Stock validation
  if (quantity > product.stock) {
    return next(new AppError('Requested quantity exceeds available stock', 400));
  }

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  // Check if the exact product is already in the cart
  const isProductInCart = cart.items.some(
    item => item.product.toString() === productId
  );

  if (isProductInCart) {
    return next(new AppError('This product is already in your cart', 400));
  }

  // Add new item to cart
  cart.items.push({
    product: productId,
    quantity,
    price: product.price,
  });

  await cart.save();

  // Update user's cart reference
  await User.findByIdAndUpdate(userId, { cart: cart._id });

  res.status(200).json({
    status: 'success',
    data: {
      cart,
    },
  });
});

// Update cart item
export const updateCartItem = asyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  // Validate product and quantity
  if (!productId || !quantity) {
    return next(new AppError('Product ID and quantity are required', 400));
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  const cartItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

  if (cartItemIndex > -1) {
    cart.items[cartItemIndex].quantity = quantity;
  } else {
    return next(new AppError('Product not found in cart', 404));
  }

  await cart.save();

  res.status(200).json({
    status: 'success',
    data: {
      cart,
    },
  });
});

// Delete cart item
export const deleteCartItem = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.user.id;

  // Validate product ID
  if (!productId) {
    return next(new AppError('Product ID is required', 400));
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  const cartItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

  if (cartItemIndex > -1) {
    cart.items.splice(cartItemIndex, 1);
  } else {
    return next(new AppError('Product not found in cart', 404));
  }

  await cart.save();

  res.status(200).json({
    status: 'success',
    data: {
      cart,
    },
  });
});

// Get all products in the cart
export const getUserCart = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      cart,
    },
  });
});


export const clearCart = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  // Clear all items from the cart
  cart.items = [];
  await cart.save();

  res.status(200).json({
    status: 'success',
    message: 'All products removed from the cart',
    data: {
      cart,
    },
  });
});