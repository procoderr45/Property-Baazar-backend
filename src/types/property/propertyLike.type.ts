import mongoose from "mongoose";
import { DeviceType } from "../device.type.js";

export type PropertyLikeType = {
    user: mongoose.Types.ObjectId;
    property: mongoose.Types.ObjectId;
    device: DeviceType
}