import Cart from "../../models/cart.model.js";

export const addToCartServices=async(userId,productId)=>{
    const cart= await Cart.findOne({userId});

    if(!cart){
        return await Cart.create({
            userId,
            items:[
                {
                    productId,
                    quantity:1
                }
            ]
        });

    }

    let index=cart.items.findIndex(ele=>{
        console.log("Db",typeof(ele.productId.toString()));
        console.log("fE",typeof(productId))
        return(
        ele.productId.toString() === productId
        )
    })
    

    if(index > -1){
        cart.items[index].quantity+=1;
    }
    else{
        cart.items.push({productId, quantity: 1});
    }

    return await cart.save();
}


export const getCartServices=async(userId)=>{
    console.log("userId",userId);
   const data=await Cart.findOne({userId}).populate("items.productId");
   return data;
}

export const removeCartProdcutServices=async(userId,productId)=>{
    const cart= await Cart.findOne({userId});

   cart.items=cart.items.filter((product)=>(
        product.productId.toString() != productId
    ))
    return await cart.save();
}