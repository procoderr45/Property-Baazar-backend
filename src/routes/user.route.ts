import express from "express";
import userController from "../controllers/user.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.get("/profile/my", isLoggedIn, userController.getMyProfile);

export default router;