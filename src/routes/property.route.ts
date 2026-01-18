import express from "express"
import propertyController from "../controllers/property.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.post("/new", isLoggedIn, propertyController.createProperty);

export default router;