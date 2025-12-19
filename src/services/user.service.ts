import { userRepository } from "../repositories/user.repository.js";
import { PublicProfileDataType, UpdateProfileType } from "../types/user.type.js";
import sendResponse from "../utils/apiResponse.js";
import { AppError } from "../utils/error/AppError.js";
import getPublicProfileData from "../utils/modules/user/getPublicProfileData.js";
import { validateProfileUpdateData } from "../utils/validations/user.validation.js";

class UserService {
    async getUserById(userId: string): Promise<PublicProfileDataType> {
        if (!userId) {
            throw new AppError("Please provide valid user id", 400);
        }

        const user = await userRepository.findByUserId(userId);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        const publicUserData = getPublicProfileData(user);

        return publicUserData;
    }

    async updateProfile(userId: string, newProfileData: UpdateProfileType) {

        if(!newProfileData) {
            throw new AppError("Please provide valid data to update profile", 400);
        }

        let isUpdateRequestedDataValid = validateProfileUpdateData(newProfileData);

        if(!isUpdateRequestedDataValid) {
            throw new AppError("Update is not allowed", 403);
        }

        //TODO: add update data validation later
        const updatedUser = await userRepository.updateUserProfile(userId, newProfileData);

        if(!updatedUser) {
            throw new AppError("User profile not updated or no user found", 400);
        }

        const publicUserData = getPublicProfileData(updatedUser);

        return publicUserData;
    }
}

export const userService = new UserService()