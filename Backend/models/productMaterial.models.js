import { Schema } from "mongoose";
import mongoose from "mongoose";

const productMaterialSchema = new Schema({
    name: {
        type: String,
        required: [true, "Material name is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],

    },
    description: {
        type: String,
    },
    image: {
        type: String,
    
    }

})

const ProductMaterial = mongoose.model('ProductMaterial', productMaterialSchema);
export default ProductMaterial;