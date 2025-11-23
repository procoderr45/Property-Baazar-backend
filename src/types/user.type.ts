import mongoose, { Document } from "mongoose";
import { Address } from "./address.type.js";

export type UserType = "Buyer" | "Seller" | "Lawyer" | "Admin" | "Guest" | "Agent";

export const userTypeValues: UserType[] = ["Buyer", "Seller", "Lawyer", "Admin", "Guest", "Agent"];

export interface User {
    name: string;
    email: string;
    password: string;
    age?: number;
    photoUrl?: string;
    bio?: string;
    isVerified: boolean;
    isActive: boolean;
    address?: Address;
    userType: UserType;
}

export interface DbUser extends User, Document {
    createdAt: Date;
    updatedAt: Date;
}
