import mongoose, { Document } from "mongoose";
import { Address } from "./address.type.js";
import { KycDocumentType, KycStatusType } from "./kyc.type.js";

export type UserType = "Buyer" | "Seller" | "Lawyer" | "Admin" | "Guest" | "Agent";

export type Contact = {
    countryCode: string;
    mobile: string;
    isMobileVerified: boolean;
};

export const userTypeValues: UserType[] = ["Buyer", "Seller", "Lawyer", "Admin", "Guest", "Agent"];

export interface User {
    name: string;
    email: string;
    password: string;
    contact: Contact;
    isEmailVerified: boolean;
    socials?: {
        instagram?: string;
        linkedin?: string;
        twitter?: string;
        youtube?: string;
        facebook?: string;
    };
    age?: number;
    photoUrl?: string;
    bio?: string;
    account: {
        isVerified: boolean;
        isActive: boolean;
        userType: UserType;
        isDeleted: boolean;
    };
    address?: Address;
    kycDetails: {
        kycStatus: KycStatusType;
        kycDocuments: KycDocumentType[];
    };
}

export interface DbUser extends User, Document {
    createdAt: Date;
    updatedAt: Date;
}
