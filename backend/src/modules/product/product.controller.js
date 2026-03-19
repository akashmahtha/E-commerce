import Product from "../../models/product.model.js";

export const createProduct = async (req, res) => {
  console.log(req.body);
  const createproduct = await Product.create(req.body);
  

  res.status(201).json({
    success: true,
    data: createproduct
  });
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