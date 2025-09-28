import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const connectToMongoDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Conntected to DB")
    }
    catch(err){
        console.log("Error connecting to MongoDB", err.message)
    }
}