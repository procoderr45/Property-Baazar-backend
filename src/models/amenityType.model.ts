import mongoose, { Document } from "mongoose";
import { AmenityType } from "../types/property/property.type.js";

const amenityTypeSchema = new mongoose.Schema<AmenityType>({
    title: {
        type: String,
        trim: true,
        lowercase: true,
        unique: [true, "Amenity already exists. Select existing amenity"]
    },
    iconUrl: {
        type: String,
        default: "https://cdn-icons-png.freepik.com/512/18395/18395916.png?ga=GA1.1.1724462388.1765285011"
    }
}, {
    timestamps: true,
})

amenityTypeSchema.index({ title: -1 })

const AmenityModel = mongoose.model<AmenityType>("AmenityType", amenityTypeSchema);

export default AmenityModel;