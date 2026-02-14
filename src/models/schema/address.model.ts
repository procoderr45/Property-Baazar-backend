import mongoose from "mongoose";
import { Address } from "../../types/address.type.js";
import { MAX_PIN_CODE_VALUE } from "../../utils/constants.js";
import { locationCoordinateSchema } from "./locationCoordinate.model.js";

export const addressSchema = new mongoose.Schema<Address>({
    location: {
        type: locationCoordinateSchema,
    },
    street: {
        type: String,
        trim: true,
        default: "",
        maxLength: [200, "Street length should not exceed 200 characters"]
    },
    city: {
        type: String,
        trim: true,
        required: [true, "Property city is required"],
        maxLength: [100, "City length should not exceed 100 characters"],
        minLength: [3, "City should be atleast 3 characters long"]
    },
    pincode: {
        type: Number,
        required: [true, "Property pincode is required"],
        max: [MAX_PIN_CODE_VALUE, `Pincode must be greater than ${MAX_PIN_CODE_VALUE}`]
    },
    state: {
        type: String,
        trim: true,
        required: [true, "Property state required"],
        maxLength: [130, "State length should not exceed 130 characters"],
        minLength: [3, "State should be atleast 3 charactes long"]
    },
    country: {
        type: String,
        trim: true,
        required: [true, "Property country is required"],
        maxLength: [130, "Country name should not exceed more than 120 characters"],
        minLength: [3, "Country name must be atleast 3 characters long"]
    }
}, { _id: false, strict: "throw" })

//indexing on address schema
addressSchema.index({ city: 1 });
addressSchema.index({ state: 1});
addressSchema.index({ country: 1});

//create 2dsphere index on address.location for findig near by users, agents, properties and etc
addressSchema.index({ "location": "2dsphere" });