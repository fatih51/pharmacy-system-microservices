import { Schema, model } from "mongoose"

const productSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    
});

export default model('Product', productSchema);