import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/error/AppError.js";

import { verifyJwtToken } from "../utils/auth/jwtToken.js";
import { userRepository } from "../repositories/user.repository.js";
import getPublicProfileData from "../utils/modules/user/getPublicProfileData.js";

export default async function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    const { token } = req.cookies;

    if (!token) {
        throw new AppError("Token missing, Please login", 403);
    }

    const decodedString = verifyJwtToken(token);
    if (!decodedString) {
        throw new AppError("Please login first", 403);
    }

    const { userId } = decodedString as any;
    if (!userId) {
        throw new AppError("Please login first", 403);
    }

    const user = await userRepository.findByUserId(userId);
    if (!user) {
        throw new AppError("Please login first", 403);
    }

    //TODO: attach only required fields
    req.user = user;

    next();

}