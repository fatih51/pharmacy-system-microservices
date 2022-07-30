import { Schema, model } from "mongoose"

const codeSchema = new Schema({
    code: String,
    product: [Object]
});

export default model('Codes', codeSchema);