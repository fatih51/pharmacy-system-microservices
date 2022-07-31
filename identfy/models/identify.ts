import { Schema, model } from "mongoose"

const identifySchema = new Schema({
    identify: Number,
    codes: {
        type: [String],
        default: [],
        required: false
    },
    name: String,
});

export default model('Identify', identifySchema);