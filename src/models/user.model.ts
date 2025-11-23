import mongoose from "mongoose";
import { DbUser, userTypeValues } from "../types/user.type.js";

const userSchema = new mongoose.Schema<DbUser>(
    {
        name: {
            type: String,
            required: [true, "Please provide your name"],
            minLength: [3, "Name should be atleast 3 characters long"],
            trim: true,
        },
        contact: {
            countryCode: {
                type: String,
                required: [true, "Please provide your country code"],
                trim: true,
            },
            mobile: {
                type: Number,
                required: [true, "Please provide your mobile number"],
                unique: [true, "Mobile number already in use"],
            },
            isMobileVerified: {
                type: Boolean,
                default: false,
            },
        },
        email: {
            type: String,
            required: [true, "Please provide valid email id"],
            unique: [true, "Email already in use"],
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        password: {
            type: String,
            required: [true, "Please provide password"],
        },
        bio: {
            type: String,
            default: "",
            trim: true,
        },
        age: {
            type: Number,
        },
        photoUrl: {
            type: String,
            default: "",
            trim: true,
        },
        address: {
            street: {
                type: String,
                trim: true,
            },
            city: {
                type: String,
                required: [true, "Please provide your city"],
                trim: true,
            },
            pincode: {
                type: Number,
            },
            state: {
                type: String,
                required: [true, "Please provide state"],
                trim: true,
            },
            country: {
                type: String,
                required: [true, "Please provide country"],
                trim: true,
            },
        },
        account: {
            isVerified: {
                type: Boolean,
                default: false,
            },
            isActive: {
                type: Boolean,
                default: true,
            },
            userType: {
                type: String,
                enum: {
                    values: userTypeValues,
                },
            },
        },
        socials: {
            instagram: String,
            youtube: String,
            twitter: String,
            linkedin: String,
            facebook: String,
        },
    },
    { timestamps: true }
);

const UserModel = mongoose.model<DbUser>("User", userSchema);

export default UserModel;
