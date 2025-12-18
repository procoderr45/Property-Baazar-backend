import mongoose from "mongoose";
import { DbUser, userTypeValues } from "../types/user.type.js";
import {
    MAX_BIO_LENGTH,
    MAX_NUMBER_LENGTH,
    MAX_PIN_CODE_VALUE,
} from "../utils/constants.js";

const userSchema = new mongoose.Schema<DbUser>(
    {
        name: {
            type: String,
            required: [true, "Please provide your name"],
            minLength: [3, "Name should be atleast 3 characters long"],
            maxLength: [50, "Name cannot exceed 50 characters"],
            trim: true,
        },
        contact: {
            countryCode: {
                type: String,
                required: [true, "Please provide your country code"],
                trim: true,
                maxLength: [4, "Country code must be maximum 4 characters long including +"],
            },
            mobile: {
                type: String,
                required: [true, "Please provide your mobile number"],
                unique: [true, "Mobile number already in use"],
                maxLength: [MAX_NUMBER_LENGTH, `Mobile number should be ${MAX_NUMBER_LENGTH}`],
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
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
        },
        followersCount: {
            type: Number,
            default: 0,
        },
        followingCount: {
            type: Number,
            default: 0
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        password: {
            type: String,
            required: [true, "Please provide password"],
        },
        role: {
            type: String,
            enum: {
                values: userTypeValues
            },
            default: "user",
            trim: true
        },
        bio: {
            type: String,
            default: "",
            trim: true,
            maxLength: [MAX_BIO_LENGTH, `Bio should be contain maximum ${MAX_BIO_LENGTH} characters`],
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
                trim: true,
            },
            pincode: {
                type: Number,
                max: [MAX_PIN_CODE_VALUE, `Pin code should not be more than ${MAX_PIN_CODE_VALUE}`],
            },
            state: {
                type: String,
                trim: true,
            },
            country: {
                type: String,
                trim: true,
            }
        },
        accountStatus: {
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
            isDeleted: {
                type: Boolean,
                default: false,
            },
        },
        socials: {
            instagram: {
                type: String,
                trim: true,
                match: [/^https?:\/\//, "Invalid Instagram URL"]
            },
            youtube: {
                type: String,
                trim: true,
                match: [/^https?:\/\//, "Invalid YouTube URL"]
            },
            twitter: {
                type: String,
                trim: true,
                match: [/^https?:\/\//, "Invalid Twitter URL"]
            },
            linkedin: {
                type: String,
                trim: true,
                match: [/^https?:\/\//, "Invalid LinkedIn URL"]
            },
            facebook: {
                type: String,
                trim: true,
                match: [/^https?:\/\//, "Invalid Facebook URL"]
            }
        }

    },
    { timestamps: true }
);

userSchema.index({ role: 1 });

userSchema.index({ name: "text" });

const UserModel = mongoose.model<DbUser>("User", userSchema);

export default UserModel;
