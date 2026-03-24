import express from "express";
import { createProduct,getProduct,deleteProduct } from "./product.controller.js";
import upload from "../../middleware/upload.js";


const router = express.Router();

router.post("/", upload.single("image"),createProduct)
router.get("/",getProduct);
router.delete("/:id", deleteProduct);

export default router;