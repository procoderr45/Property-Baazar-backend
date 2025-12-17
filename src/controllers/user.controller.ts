import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/error/catchAsync.js";
import sendResponse from "../utils/apiResponse.js";
import { PublicProfileDataType } from "../types/user.type.js";
import { ApiResponseType } from "../types/response.type.js";
import { AppError } from "../utils/error/AppError.js";

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

export default {
    getMyProfile
}