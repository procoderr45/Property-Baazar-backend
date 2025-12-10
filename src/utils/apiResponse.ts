import { Response } from "express";
import { ApiResponseType } from "../types/response.type.js";

export default function sendResponse<T>(res: Response, statusCode: number, data: ApiResponseType<T>) {
    return res.status(statusCode).json(data);
}
