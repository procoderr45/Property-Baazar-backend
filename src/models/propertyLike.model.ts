import mongoose from "mongoose";
import { PropertyLikeType } from "../types/property/propertyLike.type.js";

const propertyLikeSchema = new mongoose.Schema<PropertyLikeType>({
    device: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User id is required"]
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: [true, "Property id is required"]
    }
})

propertyLikeSchema.index({ user: 1, property: 1 }, { unique: true })
propertyLikeSchema.index({ user: 1 });
propertyLikeSchema.index({ property: 1 });

const PropertyLikeModel = mongoose.model("PropertyLike", propertyLikeSchema);

export default PropertyLikeModel;