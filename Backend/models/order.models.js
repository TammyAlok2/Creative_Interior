import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    subtotal: {
      type: Number,
    },
    tax: {
      type: Number,
    },
    shippingCharges: {
      type: Number,
    },
    couponDiscount: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
    },
    total: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      required: true,
    },
    razorpay: {
      orderId: String,
      paymentId: String,
      signature: String,
    },
    orderItems: [
      {
        name: String,
        photo: String,
        price: Number,
        quantity: Number,
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        orderStatus: {
          type: String,
          enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
          default: "Pending",
        },
        paymentStatus: {
          type: String,
          enum: ["Pending", "Paid", "Failed"],
          default: "Pending",
        },
        orderDate: {
          type: Date,
          default: Date.now(),
        },
        deliveredAt: Date,
        shippedAt: Date,
        cancelledAt: Date,
        cancellationReason: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", schema);
export default Order;
