import {asyncHandler} from '../utils/AsyncHandler.js'
import Coupon from '../models/coupon.models.js';
import AppError from '../utils/AppError.js';
import AppResponse from '../utils/AppResponse.js';

// Create a new coupon
export const createCoupon = asyncHandler(async (req, res, next) => {
  const { code, description, discount, discountType, minimumPrice, maximumOrder, status, usageLimit } = req.body;

const startDate = Date.now();
const endDate = Date.now();
const startHour = Date.now();
const endHour = Date.now();

  const coupon = await new Coupon({
    code,
    description,
    discount,
    discountType,
    startDate,
    endDate,
    startHour,
    endHour,
    minimumPrice,
    maximumOrder,
    status,
    usageLimit,
  });

  await coupon.save();

  res.status(201).json(new AppResponse(201, coupon, 'Coupon created successfully'));
});

// Update an existing coupon
export const updateCoupon = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { code, discount, discountType, startDate, endDate, startHour, endHour, minimumPrice, maximumOrder, status, usageLimit } = req.body;

  const coupon = await Coupon.findByIdAndUpdate(
    id,
    {
      code,
      discount,
      discountType,
      startDate,
      endDate,
      startHour,
      endHour,
      minimumPrice,
      maximumOrder,
      status,
      usageLimit,
    },
    { new: true, runValidators: true }
  );

  if (!coupon) {
    return next(new AppError('Coupon not found', 404));
  }

  res.status(200).json(new AppResponse(200, coupon, 'Coupon updated successfully'));
});

// Delete a coupon
export const deleteCoupon = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const coupon = await Coupon.findByIdAndDelete(id);

  if (!coupon) {
    return next(new AppError('Coupon not found', 404));
  }

  res.status(200).json(new AppResponse(200, null, 'Coupon deleted successfully'));
});

// Fetch all coupons
export const getAllCoupons = asyncHandler(async (req, res, next) => {
  const coupons = await Coupon.find();

  res.status(200).json(new AppResponse(200, coupons, 'Coupons fetched successfully'));
});

// Fetch a single coupon by ID
export const getCouponById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const coupon = await Coupon.findById(id);

  if (!coupon) {
    return next(new AppError('Coupon not found', 404));
  }

  res.status(200).json(new AppResponse(200, coupon, 'Coupon fetched successfully'));
});


// Apply a coupon
export const applyCoupon = asyncHandler(async (req, res, next) => {
    const { code } = req.body;
    const userId = req.user.id;
  
    console.log(code)
    // Find the coupon by code
    const coupon = await Coupon.findOne({ code });
  
    // Check if the coupon exists
    if (!coupon) {
      return next(new AppError('Invalid coupon code', 400));
    }
  
    // Check if the coupon is active
    if (!coupon.status) {
      return next(new AppError('Coupon is not active', 400));
    }
  
    // Check if the coupon is expired
    // const currentDate = new Date();
    // if (currentDate < coupon.startDate || currentDate > coupon.endDate) {
    //   return next(new AppError('Coupon is expired or not yet valid', 400));
    // }
  
    // Check if the coupon usage limit has been reached
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return next(new AppError('Coupon usage limit has been reached', 400));
    }
  
    // Check if the user has already used the coupon
    // if (coupon.usedBy.includes(userId)) {
    //   return next(new AppError('You have already used this coupon', 400));
    // }
  
    // Increase the used count and add the user to the usedBy array
    coupon.usedCount += 1;
    coupon.usedBy.push(userId);
  
    await coupon.save();
  
const response = {
    code: coupon.code,
    discount: coupon.discount,
    discountType: coupon.discountType,
    minimumPrice: coupon.minimumPrice,
    maximumOrder: coupon.maximumOrder,
    status: coupon.status,
    usageLimit: coupon.usageLimit,
    usedCount: coupon.usedCount,
  }
    // If all checks pass, return the coupon details
    res.status(200).json(new AppResponse(200,response, 'Coupon applied successfully'));
  });