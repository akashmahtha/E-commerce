import express from "express";
import { createSignup } from "./signup.controller.js";
import { getSignin } from './signin.controller.js';

const router = express.Router();

router.post("/", createSignup);
router.post("/user", getSignin);

export default router;