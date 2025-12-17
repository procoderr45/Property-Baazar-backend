import { PublicProfileDataType } from "./user.type.ts";

declare global {
    namespace Express {
        interface Request {
            user?: PublicProfileDataType
        }
    }
}