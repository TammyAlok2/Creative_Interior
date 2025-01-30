import Wishlist from '../models/wishlist.models.js';
import Product from '../models/product.models.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import AppError from '../utils/AppError.js';
import AppResponse from '../utils/AppResponse.js';

// Add product to wishlist
export const addProductToWishlist = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  console.log(productId)
  const userId = req.user.id;
  console.log(userId)

  // Validate product ID
  if (!productId) {
    return next(new AppError('Product ID is required', 400));
  }

  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  let wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    wishlist = new Wishlist({ user: userId, products: [] });
  }

  if (!wishlist.products.includes(productId)) {
    wishlist.products.push(productId);
  } else {
    return next(new AppError('Product already in wishlist', 400));
  }

  await wishlist.save();

  res.status(200).json(new AppResponse(200, wishlist, 'Product added to wishlist successfully'));
});

// Remove product from wishlist
export const removeProductFromWishlist = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  console.log(productId)
  const userId = req.user.id;

  // Validate product ID
  if (!productId) {
    return next(new AppError('Product ID is required', 400));
  }

  const wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) {
    return next(new AppError('Wishlist not found', 404));
  }

  const productIndex = wishlist.products.indexOf(productId);
  if (productIndex > -1) {
    wishlist.products.splice(productIndex, 1);
  } else {
    return next(new AppError('Product not found in wishlist', 404));
  }

  await wishlist.save();

  res.status(200).json(new AppResponse(200, wishlist, 'Product removed from wishlist successfully'));
});

// Get all products in the wishlist
export const getUserWishlist = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const wishlist = await Wishlist.findOne({ user: userId }).populate('products');
  if (!wishlist) {
    return next(new AppError('Wishlist not found', 404));
  }

  res.status(200).json(new AppResponse(200, wishlist, 'Wishlist fetched successfully'));
});