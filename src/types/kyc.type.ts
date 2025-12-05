import { validDocumentEntities, validKycStatusTypes } from "../utils/constants.js";

export type KycStatusType = typeof validKycStatusTypes;

export type KycDocumentEntityType = (typeof validDocumentEntities)[number];

export type KycDocumentType = {
    mediaKey?: string;
    type: KycDocumentEntityType;
    isVerified: boolean;
};
