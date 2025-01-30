
const PaymentSchema = new Schema({
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Order'
    },
    razorpayPaymentId: {
      type: String,
      required: true,
    },
    razorpayOrderId: {
      type: String,
      required: true,
    },
    razorpaySignature: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: 'INR'
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'successful', 'failed'],
      default: 'pending'
    },
    method: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });
  
  PaymentSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
  });
  
  const Payment = mongoose.model('Payment', PaymentSchema);
  export default Payment;