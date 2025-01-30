import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    name:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:Number,
        required:true
    },
    address: {
      type: String,
      required: true,
    },
    locality:{
        type:String,
        required:true
    },
    landmark:{
        type:String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    user: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

 const Address = mongoose.model("Address", addressSchema);

 export default Address