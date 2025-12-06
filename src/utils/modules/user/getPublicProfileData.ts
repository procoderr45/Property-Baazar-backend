import { DbUser, PublicProfileDataType } from "../../../types/user.type";
import { publicProfileFields } from "../../constants.js";

export default function (userData: DbUser): PublicProfileDataType {
    const publicProfileData: Partial<DbUser> = {};

    for (const key of publicProfileFields) {
        if (key in userData) {
            //@ts-ignore
            publicProfileData[key] = userData[key];
        }
    }

    return publicProfileData as PublicProfileDataType;
}
