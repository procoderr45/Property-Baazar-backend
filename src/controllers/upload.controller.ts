import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/error/catchAsync.js";
import { AppError } from "../utils/error/AppError.js";
import { FileUploadRequestType } from "../types/aws.type.js";
import { awsService } from "../services/aws.service.js";
import { ApiResponseType } from "../types/response.type.js";
import sendResponse from "../utils/apiResponse.js";

const generateUploadUrl = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if(!user) {
        throw new AppError("Please login", 400);
    }

    const fileUploadData = req.body as FileUploadRequestType;

    const uploadUrl = await awsService.generateSignedUploadUrl(fileUploadData);

    const apiResponse: ApiResponseType<any> = {
        status: "success",
        message: "upload url generated successfully",
        data: {
            url: uploadUrl
        }
    }

    return sendResponse(res, 200, apiResponse);
})

export default {
    generateUploadUrl
}