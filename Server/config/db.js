import mongoose from "mongoose";
import { DBNAME } from "../constants.js";

const connectDB = async ()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DBNAME}`) 
       console.log(`Connected to MongoDB Database:${mongoose.connection.host} `);
    } catch (error) {
        console.log(`MongoDB Connection Error:${error}`);
    }
}

export default connectDB