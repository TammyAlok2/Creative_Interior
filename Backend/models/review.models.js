import mongoose from "mongoose";
import Product from "./product.models.js";

const schema = new mongoose.Schema(
  {
    comment: {
      type: String,
      maxlength: [200, "Comment must not be more than 200 characters"],
    },
    rating: {
      type: Number,
      required: [true, "Please give Rating"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must not be more than 5"],
    },
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
     
    },
  },
  { timestamps: true }
);


schema.index({ user: 1, product: 1 }, { unique: true });
schema.pre(/^find/, function(next) {
  this.populate([
    { path: 'user', select: 'name email' },
    { path: 'product', select: 'name images price' }
  ]);
  next();
});


// // Middleware to update average rating after saving a review
// schema.post("save", async function (doc, next) {
//   await Product.calculateAverageRating(doc.product);
//   next();
// });

// // Middleware to update average rating after removing a review
// schema.post("remove", async function (doc, next) {
//   await Product.calculateAverageRating(doc.product);
//   next();
// });

export const Review = mongoose.model("Review", schema);