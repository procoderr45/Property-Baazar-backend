import mongoose from "mongoose";

type SaveType = {
    user: mongoose.Types.ObjectId;
}

export type PostSaveType = SaveType & {
    post: string; // id of post
}

export type PropertySaveType = SaveType & {
    property: mongoose.Types.ObjectId; // id of property
}