import mongoose, { Document } from "mongoose";
import { AmenityType } from "../types/property.type.js";

const amenitySchema = new mongoose.Schema<AmenityType>({
    title: {
        type: String,
        trim: true,
        lowercase: true,
        unique: [true, `{VALUE} amenity already exists. Please select {VALUE}`]
    },
    iconUrl: {
        type: String,
        default: "https://cdn-icons-png.freepik.com/512/18395/18395916.png?ga=GA1.1.1724462388.1765285011"
    }
}, {
    timestamps: true,
})

const AmenityModel = mongoose.model<AmenityType>("Amenity", amenitySchema);

export default AmenityModel;