import express from "express"
import propertyLikeController from "../controllers/propertyLike.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
const router = express.Router();

router.post("/:propertyId", isLoggedIn, propertyLikeController.likeProperty);

export default router;