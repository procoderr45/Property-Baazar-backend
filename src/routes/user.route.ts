import express, { NextFunction, Request, Response } from "express";
import userController from "../controllers/user.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.get("/profile/search", userController.searchProfiles)
router.get("/profile/my", isLoggedIn, userController.getMyProfile);
router.get("/profile/:userId", userController.getUserProfile);
router.patch("/profile/edit", isLoggedIn, userController.updateUserProfile);

export default router;