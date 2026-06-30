import { Schema } from "mongoose";
import { conn } from "../config/db.js";

export const userSchema = new Schema({
  username: { type: String, required: [true, "Username is required"] },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email:{
    type: String,
    required: [true, 'Email is required']
  }, 
  role: { type: String, enum: ["admin", "user"], default: "user"},
  verified: { type: Boolean, default: true},
  verificationToken: {type: String, default: undefined},
  verificationExpires: {type: Number, default: undefined}
});

export const User = conn.model('User', userSchema, 'users');