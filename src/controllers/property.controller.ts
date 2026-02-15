import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/error/catchAsync.js";
import { propertyService } from "../services/property.service.js";
import { ApiResponseType } from "../types/response.type.js";
import { PropertyDoc, PropertyType } from "../types/property/property.type.js";
import sendResponse from "../utils/apiResponse.js";
import { AppError } from "../utils/error/AppError.js";

const createProperty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const propertyData = req.body;
    const loggedInUser = req.user;

    if (!loggedInUser) {
        throw new AppError("Please login", 403);
    }

    const property = await propertyService.createProperty(loggedInUser._id.toString(), propertyData);

    const apiResponse: ApiResponseType<PropertyType> = {
        status: "success",
        message: "Property created successfully",
        data: property
    }

    sendResponse(res, 201, apiResponse)
})

const getProperty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const propertyId = req.params.id as string;

    if (!propertyId) {
        throw new AppError("Invalid property id", 400);
    }

    const property = await propertyService.getProperty(propertyId);
    if (!property) {
        throw new AppError("Property not found", 404);
    }

    const apiResponse: ApiResponseType<PropertyType> = {
        status: "success",
        data: property,
        message: "Property found"
    }

    sendResponse(res, 200, apiResponse);

})

const editProperty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { propertyId } = req.params;
    const newPropertyData = req.body;

    if (!newPropertyData) {
        throw new AppError("Invalid data, cannot update property details.", 400)
    }

    if (!propertyId || typeof propertyId === 'object') {
        throw new AppError("Invalid property id", 400);
    }

    const updatedProfile = await propertyService.editProperty(propertyId, newPropertyData);

    if (!updatedProfile) {
        throw new AppError("Something went wrong while updating property details.", 400);
    }

    const apiResponse: ApiResponseType<PropertyType> = {
        message: "Property details updated",
        status: "success",
        data: updatedProfile
    }

    return sendResponse(res, 200, apiResponse);

})

export default {
    createProperty,
    getProperty,
    editProperty
}