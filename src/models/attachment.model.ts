import mongoose from "mongoose";
import { validAttachmentTypes } from "../utils/modules/property/property.constants.js";

const attachmentSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, "Please provide type of attachment"],
        enum: {
            values: validAttachmentTypes,
            message: "{VALUE} is not a valid  attachment type"
        },
        trim: true
    },
    key: {
        type: String,
        trim: true
    },
    isReady: {
        type: Boolean,
        default: true //TODO: later set default to false and use lambda to make it to true
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: [true, "Property id is required"]
    }
}, {
    timestamps: true
})

const AttachmentModel = mongoose.model("Attachment", attachmentSchema);

export default attachmentSchema;