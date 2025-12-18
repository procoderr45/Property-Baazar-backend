import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/error/catchAsync.js";
import { authService } from "../services/auth.service.js";
import sendResponse from "../utils/apiResponse.js";
import { PublicProfileDataType } from "../types/user.type.js";
import { ApiResponseType } from "../types/response.type.js";
import setCookie from "../utils/auth/setCookie.js";
import getPublicProfileData from "../utils/modules/user/getPublicProfileData.js";

const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, password, contact, role } = req.body;

    const newUser: PublicProfileDataType = await authService.registerUser({
        email,
        name,
        contact,
        password,
        role
    });

    const response: ApiResponseType<PublicProfileDataType> = {
        status: "success",
        message: "User registered successfully",
        data: newUser,
    };

    return sendResponse(res, 201, response);
});

const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const { user, jwtToken } = await authService.loginUser({
        email,
        password
    });

    setCookie(res, "token", jwtToken);

    const userPublicData = getPublicProfileData(user)

    const response: ApiResponseType<PublicProfileDataType> = {
        data: userPublicData,
        message: "Logged in successfully",
        status: "success"
    }

    return sendResponse(res, 200, response)
})

export default { registerUser, loginUser };
