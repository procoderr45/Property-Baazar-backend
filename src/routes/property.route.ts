import express from "express"
import propertyController from "../controllers/property.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import isPropertyAuthorized from "../middlewares/isPropertyAuthorized.js";

const router = express.Router();

router.post("/new", isLoggedIn, propertyController.createProperty);
router.post("/nearby", propertyController.getPropertiesNearMe);

router.get("/:id", propertyController.getProperty);

router.patch("/edit/:propertyId", isLoggedIn, isPropertyAuthorized, propertyController.editProperty);

router.post("/save/:propertyId", isLoggedIn, propertyController.saveProperty);
router.post("/unsave/:propertyId", isLoggedIn, propertyController.unSaveProperty);
router.get("/saved/my", isLoggedIn, propertyController.getMySavedProperties);


export default router;