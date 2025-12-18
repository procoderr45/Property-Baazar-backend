import { userRepository } from "../repositories/user.repository.js";
import { PublicProfileDataType } from "../types/user.type.js";
import { AppError } from "../utils/error/AppError.js";
import getPublicProfileData from "../utils/modules/user/getPublicProfileData.js";

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
}

export const userService = new UserService()