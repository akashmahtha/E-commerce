import mongoose from "mongoose";

const  productSchema=new mongoose.Schema({
    productName:String,
    price:Number,
    description:String,
    category:String,
    // image:String
},{strict:false})

export default mongoose.model("Product",productSchema)