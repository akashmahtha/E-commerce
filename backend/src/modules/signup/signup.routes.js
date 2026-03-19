import express from "express";
import { createSignup } from "./signup.controller.js";

const router = express.Router();

router.post("/", createSignup);

export default router;