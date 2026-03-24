import mongoose from "mongoose";

const  productSchema=new mongoose.Schema({
    productName:String,
    price:Number,
    description:String,
    category:String,
    // image:String
    image:{
        type:String,
        required:true
    }
},{strict:true});

export default mongoose.model("Product",productSchema)