import Signup from "../../models/signup.model.js";

export  const createSignup=async(req,res)=>{
    console.log(req.body);
    try{
        const createsignup=await Signup.create(req.body);
        res.status(201).json({
            success: true,
            data: createsignup
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create signup"
        });
    }
}