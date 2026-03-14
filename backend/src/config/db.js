import mongoose from "mongoose";    

console.log("MongoDB URL:", process.env.MONGO_URL);

const connectDB=async ()=>{
   await mongoose.connect(process.env.MONGO_URL)
   console.log("MongoDB connected successfully");
    
}

export default connectDB;