import { address } from "./address.type.js";

export type UserType = "Buyer" | "Seller" | "Lawyer" | "Admin" | "Guest" | "Agent";

export interface User {
    name: string;
    email: string;
    password: string;
    age: number;
    photoUrl: string;
    bio: string;
    address: address;
}
