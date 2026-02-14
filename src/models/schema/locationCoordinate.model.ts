import mongoose from "mongoose";
import { LocationCoordinateType } from "../../types/address.type.js";

export const LocationCoordinateSchema = new mongoose.Schema<LocationCoordinateType>({
    type: {
        type: String,
        enum: {
            values: ["Point"],
            message: "Invalid location type"
        },
        default: "Point",
        required: [true, "Location type is required"]
    },
    coordinates: {
        type: [Number],
        required: [true, "Location coordinates are required"]
    }
}, {
    _id: false,
    strict: "throw"
})
