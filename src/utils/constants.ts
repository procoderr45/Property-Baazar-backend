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
    "bio",
    "photoUrl",
    "accountStatus",
    "socials",
    "kycDetails.kycStatus",
    "address.state",
    "address.country",
] as const;
