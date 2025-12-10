import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/error/catchAsync.js";
import { authService } from "../services/user.service.js";
import sendResponse from "../utils/apiResponse.js";
import { PublicProfileDataType } from "../types/user.type.js";
import { ApiResponseType } from "../types/response.type.js";

const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, password, contact } = req.body;

    const newUser: PublicProfileDataType = await authService.registerUser({
        email,
        name,
        contact,
        password,
    });

    const response: ApiResponseType<PublicProfileDataType> = {
        status: "success",
        message: "User registered successfully",
        data: newUser,
    };

    return sendResponse(res, 201, response);
});

export default { registerUser };
