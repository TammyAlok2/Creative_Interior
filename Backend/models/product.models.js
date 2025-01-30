import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: "Price must be a positive number",
      },
    },
    tax: {
      type: Number,
      default: 0.18,
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    materialsAvailable: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductMaterial",
        required: [true, "Material is required"]
      }
    ],

    
    ratings: {
      type: Number,
      default: 0,
      min: [0, "Ratings cannot be less than 0"],
      max: [5, "Ratings cannot be more than 5"],
    },
    numberOfReviews: {
      type: Number,
      default: 0
    },
    images: [
      {
        public_id: {
          type: String,
          required: [true, "Image public_id is required"],
        },
        secure_url: {
          type: String,
          required: [true, "Image URL is required"],
        },
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],

    shipping: {
      type: Number,
      default: 0,
    },
    orginCountry: {
      type: String,
      default: "INDIA"
    },
    manufacturerCountry: {
      type: String,
      default: "INDIA",
    },
    brand: {
      type: String,
      default: "Creative Interiors"
    },
    specifications: [
      {
        key: {
          type: String,
          required: [true, "Specification key is required"],
        },
        value: {
          type: String,
          required: [true, "Specification value is required"],
        },
      },
    ],
    createdBy: {
      type: String,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual to calculate the number of reviews
productSchema.virtual("numOfReviews").get(function () {
  return this.reviews.length;
});

// Virtual to calculate the average rating
// productSchema.virtual("averageRating").get(function () {
//   if (this.reviews.length === 0) return 0;
//   const sum = this.reviews.reduce((total, review) => total + review.rating, 0);
//   return sum / this.reviews.length;
// });

// Middleware to update `updatedAt` on save
productSchema.pre("save", function (next) {
  //  mongoose.set('debug', true);
  this.updatedAt = Date.now();
  next();
});

// Middleware to update average rating after saving a review
// productSchema.post("save", async function (doc, next) {
//   await doc.constructor.calculateAverageRating(doc._id);
//   next();
// });

// // Static method to calculate average rating
// productSchema.statics.calculateAverageRating = async function (productId) {
//   const product = await this.findById(productId).populate("reviews");
//   if (product.reviews.length === 0) {
//     product.ratings = 0;
//   } else {
//     const sum = product.reviews.reduce((total, review) => total + review.rating, 0);
//     product.ratings = sum / product.reviews.length;
//   }
//   await product.save();
// };

const Product = mongoose.model("Product", productSchema);
export default Product;
