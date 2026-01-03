import express from "express"
import uploadController from "../controllers/upload.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.post("/generate", isLoggedIn, uploadController.generateUploadUrl);

export default router;