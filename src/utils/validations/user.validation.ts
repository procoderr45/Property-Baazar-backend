import { UpdateAllowedFieldKey, UpdateProfileType } from "../../types/user.type.js";
import { updateAllowedFields } from "../constants.js";
import { AppError } from "../error/AppError.js";

export const validateProfileUpdateData = (newProfileUpdateData: UpdateProfileType) => {
    const updateRequestedFields = Object.keys(newProfileUpdateData) as UpdateAllowedFieldKey[];

    let isUpdateAllowed = updateRequestedFields.every(key => updateAllowedFields.includes(key))

    if(!isUpdateAllowed) {
        throw new AppError("Requested updates are not allowed", 403);
    }

    //TODO: add update validations later
    return true;
}