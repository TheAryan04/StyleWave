import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/ecommerce`);
        console.log("Connected to MongoDB");
    }catch(error){
        console.log("Error");
    }
}
export default connectDB;