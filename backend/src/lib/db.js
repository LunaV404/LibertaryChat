import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://luna:WRB57sT45zqPzvH5@cluster0.83j3z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`MongoDB error: ${error}`)
    }
};