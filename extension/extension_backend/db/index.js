import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config({
    path:"./.env"
})

const connectDB= async ()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGO_DB_URI}/${process.env.DB_NAME}`)
        console.log(`\nMongoDB Connected Sucessfully DB HOST:${connectionInstance.connection.host}`)
    } catch (error) {
        console.error("\nFailed to Connect to MongoDB",error)
    }  
}

export default connectDB