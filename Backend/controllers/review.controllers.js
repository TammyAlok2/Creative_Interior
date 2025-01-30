import { asyncHandler } from '../utils/AsyncHandler.js';
import { Review } from '../models/review.models.js';
import AppError from '../utils/AppError.js';
import AppResponse from '../utils/AppResponse.js';
import Product from '../models/product.models.js';

// Add a new review 
export const addReview = asyncHandler(async (req, res, next) => {
  const { comment, rating, productId } = req.body;
  const userId = req.user.id;
  console.log(productId,userId)

  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  try {
    // Check if user has already reviewed this product
    const existingReview = await Review.findOne({ user: userId, product: productId });

    let review;
    if (existingReview) {
      // Update existing review
      review = await Review.findByIdAndUpdate(
        existingReview._id,
        { comment, rating },
        { new: true, runValidators: true }
      );
      res.status(200).json(new AppResponse(200, review, "Review updated successfully"));
    } else {
      // Create new review
      review = await Review.create({
        comment,
        rating,
        user: userId,
        product: productId,
      });
      res.status(201).json(new AppResponse(201, review, "Review added successfully"));
    }

    // Update product's average rating
    const reviews = await Review.find({ product: productId });
    const averageRating =
      reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await Product.findByIdAndUpdate(productId, {
      ratings: Math.round(averageRating * 10) / 10,
      numberOfReviews: reviews.length,
    });
  } catch (error) {
    // Handle duplicate review error
    if (error.code === 11000) {
      return next(new AppError("You have already reviewed this product", 400));
    }
    next(error);
  }
});


// Delete a review
export const deleteReview = asyncHandler(async (req, res, next) => {
  const { reviewId } = req.params;
  const user = req.user.id;

  const review = await Review.findOneAndDelete({ _id: reviewId, user });
  if (!review) {
    return next(new AppError('Review not found or user not authorized', 404));
  }

  res.status(200).json(new AppResponse(200, null, 'Review deleted successfully'));
});

// Update a review
export const updateReview = asyncHandler(async (req, res, next) => {
  const { reviewId } = req.params;
  const { comment, rating } = req.body;
  const user = req.user.id;

  const review = await Review.findOneAndUpdate(
    { _id: reviewId, user },
    { comment, rating },
    { new: true, runValidators: true }
  );
  if (!review) {
    return next(new AppError('Review not found or user not authorized', 404));
  }

  res.status(200).json(new AppResponse(200, review, 'Review updated successfully'));
});

// Fetch reviews by product
export const getReviewsByProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  const reviews = await Review.find({ product: productId }).populate('user', 'name');
  if (!reviews) {
    return next(new AppError('No reviews found for this product', 404));
  }

  res.status(200).json(new AppResponse(200, reviews, 'Reviews fetched successfully'));
});

// Fetch reviews by user
export const getReviewsByUser = asyncHandler(async (req, res, next) => {
  const user = req.user.id;

  const reviews = await Review.find({ user }).populate('product', 'name');
  if (!reviews) {
    return next(new AppError('No reviews found for this user', 404));
  }

  res.status(200).json(new AppResponse(200, reviews, 'Reviews fetched successfully'));
});