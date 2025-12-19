import { UpdateProfileType } from "../types/user.type.js";

export const MAX_NUMBER_LENGTH = 12;
export const MAX_BIO_LENGTH = 500;
export const MAX_PIN_CODE_VALUE = 6;

export const validDocumentEntities = ["aadhar", "pan_card", "voter_id", "driving_license"] as const;
export const validKycStatusTypes = ["pending", "approved", "rejected", "on_hold"] as const;

export const publicProfileFields = [
    "name",
    "_id",
    "contact.isMobileVerified",
    "isEmailVerified",
    "role",
    "bio",
    "photoUrl",
    "accountStatus",
    "socials",
    "kycDetails.kycStatus",
    "address.state",
    "address.country",
] as const;

export const updateAllowedFields: (keyof UpdateProfileType)[] = [
    "name",
    "contact",
    "socials",
    "age",
    "photoUrl",
    "bio",
    "address"
]

export const defaultCookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_NEV === "production"
};