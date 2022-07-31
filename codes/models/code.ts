import { Schema, model } from "mongoose"

const codeSchema = new Schema({
    code: String,
    product: [Object],
    identify: Number,
});

export default model('Codes', codeSchema);