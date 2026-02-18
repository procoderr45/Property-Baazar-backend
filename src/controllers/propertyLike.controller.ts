import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/error/catchAsync.js";
import { AppError } from "../utils/error/AppError.js";
import { propertyLikeService } from "../services/propertyLike.service.js";
import { ApiResponseType } from "../types/response.type.js";
import sendResponse from "../utils/apiResponse.js";

const likeProperty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
        throw new AppError("Please login", 403);
    }

    const { propertyId } = req.params as { propertyId: string };
    if (!propertyId) {
        throw new AppError("Invalid property id", 400);
    }

    const newLikes = await propertyLikeService.likeProperty(propertyId, user._id.toString());

    const apiResponse: ApiResponseType<number> = {
        message: "Property liked successfully",
        status: "success",
        data: newLikes,
    }

    return sendResponse(res, 201, apiResponse);

})

export default {
    likeProperty
}