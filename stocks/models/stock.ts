import { Schema, model } from "mongoose"

const stockSchema = new Schema({
    product: Object,
    quantity: Number
    
});

export default model('Stock', stockSchema);