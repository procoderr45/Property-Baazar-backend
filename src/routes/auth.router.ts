import express from "express";
import authController from "../controllers/auth.controller.js";
console.log("Auth router loaded");


const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser)

export default router;
