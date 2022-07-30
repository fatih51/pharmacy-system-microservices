import { Schema, model } from "mongoose"

const authSchema = new Schema({
    email: String,
    password: String,
    name: String,
});

export default model('Auth', authSchema);