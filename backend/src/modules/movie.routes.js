import express from "express";
import { getMovie } from "./movie.controller.js";

const router=express.Router();

router.get("/",getMovie)

export default router;