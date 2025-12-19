import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/error/catchAsync.js";
import sendResponse from "../utils/apiResponse.js";
import { PublicProfileDataType } from "../types/user.type.js";
import { ApiResponseType } from "../types/response.type.js";
import { AppError } from "../utils/error/AppError.js";
import { userRepository } from "../repositories/user.repository.js";
import { userService } from "../services/user.service.js";
import getPublicProfileData from "../utils/modules/user/getPublicProfileData.js";

const getMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userData = req.user;

    if (!userData) {
        throw new AppError("Please login first", 403);
    }

    const responseData: ApiResponseType<PublicProfileDataType> = {
        status: "success",
        data: userData,
        message: "User profile found"
    }

    return sendResponse(res, 200, responseData)
})

const getUserProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const userProfile = await userService.getUserById(userId);

    const userProfileApiResponse: ApiResponseType<PublicProfileDataType> = {
        message: "User profile found",
        status: "success",
        data: userProfile
    };

    return sendResponse(res, 200, userProfileApiResponse);

})

const updateUserProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || !user._id) {
        throw new AppError("Please provide user id", 400);
    }

    const newProfileData = req.body;

    const newUpdatedProfileData = await userService.updateProfile(user._id.toString(), newProfileData);

    const apiResponse: ApiResponseType<PublicProfileDataType> = {
        status: "success",
        data: newUpdatedProfileData,
        message: " "
    }

    return sendResponse(res, 200, apiResponse);
})

export default {
    getMyProfile,
    getUserProfile,
    updateUserProfile
}