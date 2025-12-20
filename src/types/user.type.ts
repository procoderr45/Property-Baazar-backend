import { Document } from "mongoose";
import { Address } from "./address.type.js";
import { KycDocumentType, KycStatusType } from "./kyc.type.js";

export type UserAccountType = "buyer" | "seller" | "lawyer" | "admin" | "broker" | "user" | "home_service_provider" | "consultant";

export type Contact = {
    countryCode: string;
    mobile: string;
    isMobileVerified?: boolean;
};

export const userTypeValues: UserAccountType[] = ["user", "buyer", "seller", "lawyer", "admin", "broker", "home_service_provider", "consultant"];

export interface UserType {
    name: string;
    email: string;
    password: string;
    contact: Contact;
    role: UserAccountType;
    isEmailVerified: boolean;
    followersCount: number;
    followingCount: number;
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
    accountStatus: {
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

export interface DbUser extends UserType, Document {
    createdAt: Date;
    updatedAt: Date;
}

export type UserRegistrationData = Pick<UserType, "email" | "password" | "contact" | "name" | "role">;

export type PublicProfileDataType = Pick<DbUser, "_id" | "name" | "socials" | "photoUrl" | "isEmailVerified" | "bio" | "role"> & {
    kycDetails: {
        kycStatus: KycStatusType;
    };
};

export type LoginRequestType = {
    email: string;
    password: string;
}

export type UpdateProfileType = Partial<Omit<PublicProfileDataType, "isEmailVerified" | "kycDetails">> & {
    contact: Contact,
    age: Number,
    address: Address
};

export type UpdateAllowedFieldKey = keyof UpdateProfileType;