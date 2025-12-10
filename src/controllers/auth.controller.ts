import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/error/catchAsync";
import { authService } from "../services/user.service";
import sendResponse from "../utils/apiResponse";
import { PublicProfileDataType } from "../types/user.type";
import { ApiResponseType } from "../types/response.type";

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
