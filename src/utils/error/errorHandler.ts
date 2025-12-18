import { NextFunction, Request, Response } from "express";
import { AppError } from "./AppError.js";
import sendResponse from "../apiResponse.js";
import { ApiResponseType } from "../../types/response.type.js";

export default function handleError(err: AppError | Error, req: Request, res: Response, next: NextFunction) {
    // res.status(err.)
    if (err instanceof AppError) {
        const response: ApiResponseType<Object> = {
            message: err.message,
            status: "error",
        }
        return sendResponse(res, err.statusCode, response)
    }

    return res.status(400).send({
        message: err.message || "Something went wrong",
        status: "fail"
    })

}