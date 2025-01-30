import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: 'User',
    required: true,
  },
  items: [cartItemSchema],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

cartSchema.pre('save', function (next) {
  this.totalPrice = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;