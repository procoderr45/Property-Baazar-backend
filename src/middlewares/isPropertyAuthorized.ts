import { NextFunction, Request, Response } from "express";
import PropertyModel from "../models/property.model.js";
import { AppError } from "../utils/error/AppError.js";
import mongoose from "mongoose";

export default async function (req: Request, res: Response, next: NextFunction) {
    const user = req.user;
    const propertyId = req.params.propertyId;

    if(!user) {
        throw new AppError("Please login", 403);
    }

    const propertyData = await PropertyModel.findById(propertyId)
        .select("_id postedBy managedBy")
        .lean();

    if(!propertyData) {
        throw new AppError("Property not found.", 404);
    }

    //TODO: fix later so that the property,managedBy also can edit the property details
    if(user._id.toString() !== propertyData.postedBy.toString()) {
        throw new AppError("You cannot edit this property details", 403);
    }

    next();
}