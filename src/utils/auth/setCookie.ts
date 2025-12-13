import { Response } from "express";
import { CookieOptions } from "../../types/cookie.type.js";
import { defaultCookieOptions } from "../constants.js";

export default function setCookie(res: Response, tokenName: string, value: string, cookieOptions: CookieOptions = defaultCookieOptions) {
    res.cookie(tokenName, value, cookieOptions)
}