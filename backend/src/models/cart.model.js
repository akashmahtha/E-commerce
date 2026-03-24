import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Signup",
    required: true
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],

  
  subtotal: { 
    type: Number, 
    default: 0 },
  gst: { 
    type: Number, 
    default: 0 },
  total: { 
    type: Number, 
    default: 0 }

}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);