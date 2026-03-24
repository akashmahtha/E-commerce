import express from "express";
import { addToCart,getCart ,removeCartProduct} from "./cart.controller.js";

const router=express.Router();  

router.post("/",addToCart);
router.post("/getCart",getCart);
router.post("/removeCartProduct",removeCartProduct);    

export default router;