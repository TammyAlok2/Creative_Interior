import mongoose from "mongoose";

// Define the Coupon Schema
const CouponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    discount: {
      type: Number,
      required: true,
      min: 0,
    },
    description:{
type:String,
    },
    discountType: {
      type: String,
      default: "%",
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    startHour: {
      type: Number,
      default: null,
    },
    endHour: {
      type: Number,
      default: null,
    },
    minimumPrice: {
      type: Number,
      default: null,
      min: 0,
    },
    maximumOrder: {
      type: Number,
      default: null,
      min: 0,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    usageLimit: {
      type: Number,
      min: 0,
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    usedBy:[
        {
          type: String,
          ref: "User",
        }
    ]
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Export the Coupon model
const Coupon = mongoose.model("Coupon", CouponSchema);

export default Coupon;