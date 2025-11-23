import mongoose, { Document } from "mongoose";
import { Address } from "./address.type.js";

export type UserType = "Buyer" | "Seller" | "Lawyer" | "Admin" | "Guest" | "Agent";

export type Contact = {
    countryCode: string;
    mobile: number;
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
    };
    address?: Address;
}

export interface DbUser extends User, Document {
    createdAt: Date;
    updatedAt: Date;
}
