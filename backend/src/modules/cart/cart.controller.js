import { addToCartServices, getCartServices,removeCartProdcutServices } from "./cart.services.js";

export const addToCart=async(req,res)=>{
    console.log("req.body",req.body);
    try{
        const {productId,userId}=req.body;
        const cart= await addToCartServices(userId,productId);
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({
            message:error
        })

    }
}


export const getCart=async(req,res)=>{
    try{
        const{userId}=req.body;
        const cart= await getCartServices(userId);
        console.log("cart",cart);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({
            message:error
        });
    }
}

export const removeCartProduct=async(req,res)=>{
    try {
        const {userId,productId}=req.body;
        const cart= await removeCartProdcutServices(userId,productId);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({
            message:error
        });
    }   
}

