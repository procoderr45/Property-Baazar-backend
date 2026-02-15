import mongoose from "mongoose";
import { PropertySaveType } from "../types/save.type.js";

const savePropertySchema = new mongoose.Schema<PropertySaveType>({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: [true, "Property id is required to save property"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User id is required to save property"]
    }
}, {
    timestamps: true
})

savePropertySchema.index({ property: 1, user: 1 }, { unique: true });

const SavePropertyModel = mongoose.model("SaveProperty", savePropertySchema);

export default SavePropertyModel