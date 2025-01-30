import { Schema } from "mongoose";
import mongoose from "mongoose";

const productServiceSchema = new Schema({
    name:{
        type:String,
        required:[true, "Service name is required"],
    },
    image: {
        public_id: {
          type: String,
          required: false, // Optional for categories without an image
        },
        secure_url: {
          type: String,
          required: false,
        },
      },
})

const ProductService = mongoose.model('ProductService', productServiceSchema);
export default ProductService;