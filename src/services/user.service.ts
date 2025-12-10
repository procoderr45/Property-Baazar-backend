import { userRepository } from "../repositories/user.repository";
import { UserRegistrationData } from "../types/user.type";
import getPublicProfileData from "../utils/modules/user/getPublicProfileData";
import { validateRegistrationData } from "../utils/validations/auth.validation";

class AuthService {
    async registerUser(data: UserRegistrationData) {
        const userRegistrationData: UserRegistrationData = validateRegistrationData(data);

        const existingUser = await userRepository.findByEmail(userRegistrationData.email);

        if (existingUser) {
            throw new AppError("User with this email already exists", 409, true);
        }

        const newUser = await userRepository.register(userRegistrationData);

        const publicUserData = getPublicProfileData(newUser);

        return publicUserData;
    }
}

export const authService = new AuthService();
