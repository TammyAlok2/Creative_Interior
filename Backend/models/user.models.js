import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },

    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email address",
      },
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    phoneNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v); // Basic 10-digit phone number validation
        },
        message: "Please enter a valid phone number",
      },
    },
    verifyEmail: {
      type: String,
      default: false,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    cart:[
{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Cart"
}
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// Pre-save middleware to hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Instance method to compare passwords
userSchema.methods = {
  // method which will help us compare plain password with hashed password and returns true or false
  comparePassword: async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
  },

  // Will generate a JWT token with user id as payload
  generateJWTToken: async function () {
    return await jwt.sign(
      { id: this._id, role: this.role, subscription: this.subscription },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
  },

  // This will generate a token for password reset
  generatePasswordResetToken: async function () {
    // creating a random token using node's built-in crypto module
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Again using crypto module to hash the generated resetToken with sha256 algorithm and storing it in database
    this.forgotPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Adding forgot password expiry to 15 minutes
    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;

    return resetToken;
  },
};

const User = mongoose.model("User", userSchema);

export default User;
