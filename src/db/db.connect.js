import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';

async function connectDB() {
    const uri = `${process.env.MONGODB_URI}/${DB_NAME}`; // 
    try {
        await mongoose.connect(uri, {
        });
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
        throw new Error("Failed to connect to MongoDB");
    }
}

export default connectDB;