import mongoose from "mongoose";
import { DbUser, userTypeValues } from "../types/user.type.js";
import {
    MAX_BIO_LENGTH,
    MAX_NUMBER_LENGTH,
    MAX_PIN_CODE_VALUE,
    validDocumentEntities,
    validKycStatusTypes,
} from "../utils/constants.js";

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
                required: [true, "Please provide your city"],
                trim: true,
            },
            pincode: {
                type: Number,
                max: [MAX_PIN_CODE_VALUE, `Pin code should not be more than ${MAX_PIN_CODE_VALUE}`],
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
            isDeleted: {
                type: Boolean,
                default: false,
            },
        },
        socials: {
            instagram: String,
            youtube: String,
            twitter: String,
            linkedin: String,
            facebook: String,
        },
        kycDetails: {
            kycStatus: {
                type: "string",
                enum: {
                    values: validKycStatusTypes,
                    message: "{VALUE} is not a valid kyc status",
                },
                trim: true,
            },
            kycDocuments: [
                {
                    type: {
                        type: String,
                        enum: {
                            values: validDocumentEntities,
                            message: "{VALUE} is not a valid kyc document type",
                        },
                        trim: true,
                    },
                    mediaKey: {
                        type: String,
                        default: "",
                    },
                    isVerified: {
                        type: Boolean,
                        default: false,
                    },
                },
            ],
        },
    },
    { timestamps: true }
);

const UserModel = mongoose.model<DbUser>("User", userSchema);

export default UserModel;
