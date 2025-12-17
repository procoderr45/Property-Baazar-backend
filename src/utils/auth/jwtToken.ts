import jwt from "jsonwebtoken"
import { getTypedEnv } from "../../config/env.js"

export function generateJwtToken(userId: string) {
    const jwtSecret = getTypedEnv().JWT_SECRET_KEY;

    const token = jwt.sign({ userId }, jwtSecret);

    return token;
}

export function verifyJwtToken(token: string) {
    const decoded = jwt.verify(token, getTypedEnv().JWT_SECRET_KEY)

    return decoded;
}