// dotenv config
import dotenv from 'dotenv'
dotenv.config()
// import app
import app from "./app.js";
import connectDB from './config/db.js';



const PORT = process.env.PORT || 3030

app.listen(PORT,async()=>{
    // connect DB 
    await connectDB()
    console.log(`Server running at PORT:${PORT}`);
});