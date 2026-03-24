import Product from "../../models/product.model.js";
import cloudinary from "../../config/cloudinary.js";
import { createProductService } from "./product.services.js"; 

const streamUpload=(req)=>{
  return new Promise((resolve,reject)=>{

    const stream=cloudinary.uploader.upload_stream(
      {folder:"products"},
      (error,result)=>{
        if(result)resolve(result);
        else reject(error);
      }
    )
    stream.end(req.file.buffer);
  })
}


export const createProduct = async (req, res) => {


  if(!req.file){
    res.status(400).json({      
      success:false,
      message:"file not upoloaded"
    })
  }  

  const result = await streamUpload(req);
  console.log(result);

  const productInfo= await createProductService({
    ...req.body,
    image:result.secure_url
  });

    if(result){
      res.status(201).json({
        success:true,
        data:result
      })
    }
  // console.log(req.body);
//   try{
//   const createproduct = await Product.create(req.body);
  

//   res.status(201).json({
//     success: true,
//     data: createproduct
//   });
// } 
// catch (error) {  res.status(500).json({
//     success: false,
//     message: "Failed to create product",
//     error: error.message
//   });
// };
};

export const getProduct=async(req,res)=>{
    try{
        const productview=await Product.find();
        res.status(200).json({
            success:true,
            productData:productview
        })
    } 
    catch (error) {
        res.status(500).json({
            success:false,
            productData:error.message
        })
    }
}

export const deleteProduct = async (req, res) => {
try{
    let {id}=req.params;

    const removeProduct = await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      removeProduct
    });
  } catch (error) {
    res.status(500).json({
    success: false,
    message: "Failed to delete product",
    });
  }
};