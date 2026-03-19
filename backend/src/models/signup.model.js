import mongoose from "mongoose";

const signupSchema=new mongoose.Schema({
    email:String,
    firstName:String,
    lastName:String,
    phoneNo:String,
    password:String,
    confirmPassword:String
}, {strict:false})

export default mongoose.model("Signup", signupSchema)