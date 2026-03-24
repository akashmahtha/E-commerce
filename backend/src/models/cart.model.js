import mongoose from "mongoose";

 const cartSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Signup"
    },
    items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
            },
            quantity:Number
            
        },
    ]
 },{strict:true});

 export default mongoose.model("Cart",cartSchema)   