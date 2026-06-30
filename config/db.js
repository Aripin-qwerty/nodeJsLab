import mongoose from "mongoose";
import env from "dotenv/config";

export const conn = mongoose.createConnection(process.env.CONNECTION_STRING_MONGODB);


