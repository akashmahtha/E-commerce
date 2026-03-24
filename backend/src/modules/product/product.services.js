import Product from "../../models/product.model.js";

export const createProductService = async (data) => {
    return await Product.create(data);
}