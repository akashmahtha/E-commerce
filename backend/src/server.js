import './config/env.js';
import express from 'express';
import app from './app.js';
import './config/db.js';
import connectDB from './config/db.js';
import cors from 'cors';
import movieRouter from './modules/movie.routes.js'
import productApi from './modules/product/product.routes.js';
import productView from './modules/product/product.routes.js';
import productDeleteRouter from "./modules/product/product.routes.js";
import userApi from './modules/signup/signup.routes.js';
import cartRouter from './modules/cart/cart.routes.js';



app.use(express.json());
app.use(cors());




let PORT=process.env.PORT;
connectDB();


app.use("/api/getMovie",movieRouter)
//product routes
app.use("/api/createProduct", productApi);
app.use("/api/getProduct", productView);
app.use("/api/deleteProduct", productDeleteRouter);

//signup routes
app.use("/api/signup", userApi);

//signin routes
app.use("/api/signin", userApi);

//cart routes
app.use("/api/addToCart", cartRouter);
app.use("/api", cartRouter);





app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
