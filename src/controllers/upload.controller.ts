import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/error/catchAsync.js";
import { AppError } from "../utils/error/AppError.js";
import { FileUploadRequestType, BulkFileUploadRequestType } from "../types/aws.type.js";
import { awsService } from "../services/aws.service.js";
import { ApiResponseType } from "../types/response.type.js";
import sendResponse from "../utils/apiResponse.js";

const generateUploadUrl = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) throw new AppError("Please login", 400);
    const fileUploadData = req.body as FileUploadRequestType;
    const uploadUrl = await awsService.generateSignedUploadUrl(fileUploadData);
    const apiResponse: ApiResponseType<any> = {
        status: "success",
        message: "Upload URL generated successfully",
        data: { url: uploadUrl },
    };
    return sendResponse(res, 200, apiResponse);
});

const bulkGenerateUploadUrls = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) throw new AppError("Please login", 400);

    const data = req.body as BulkFileUploadRequestType;

    const imageFiles = data.files.filter(f => f.fileType === "image");
    const videoFiles = data.files.filter(f => f.fileType === "video");

    if (imageFiles.length > 7) throw new AppError("Maximum 7 images allowed", 400);
    if (videoFiles.length > 4) throw new AppError("Maximum 4 videos allowed", 400);

    const result = await awsService.generateBulkSignedUploadUrls(data);

    const apiResponse: ApiResponseType<any> = {
        status: "success",
        message: "Bulk upload URLs generated successfully",
        data: result,
    };
    return sendResponse(res, 200, apiResponse);
});

export default { generateUploadUrl, bulkGenerateUploadUrls };