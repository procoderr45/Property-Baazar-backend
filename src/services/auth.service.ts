import { userRepository } from "../repositories/user.repository.js";
import { LoginRequestType, UserRegistrationData } from "../types/user.type.js";
import { generateJwtToken } from "../utils/auth/jwtToken.js";
import setCookie from "../utils/auth/setCookie.js";
import { AppError } from "../utils/error/AppError.js";
import getPublicProfileData from "../utils/modules/user/getPublicProfileData.js";
import { isEmail, validateRegistrationData } from "../utils/validations/auth.validation.js";

class AuthService {
    async registerUser(data: UserRegistrationData) {
        const userRegistrationData: UserRegistrationData = validateRegistrationData(data);

        const existingUser = await userRepository.findByEmail(userRegistrationData.email);

        if (existingUser) {
            throw new AppError("User with this email already exists", 409, true);
        }

        //TODO: hash password and validation registration data strictly

        const newUser = await userRepository.register(userRegistrationData);

        const publicUserData = getPublicProfileData(newUser);

        return publicUserData;
    }

    async loginUser(data: LoginRequestType) {
        const { email, password } = data;
        if (!email || !password) {
            throw new AppError("Please provide valid email and password", 400);
        }

        let isValidEmail = isEmail(email);
        if (!isValidEmail) {
            throw new AppError("Please provide valid email", 400);
        }

        const existingUser = await userRepository.findByEmail(email);
        if (!existingUser) {
            throw new AppError("Invalid credentials", 400);
        }

        if(existingUser.accountStatus.isDeleted) {
            throw new AppError("Invalid credentials or unable to access your account", 400)
        }

        let isPasswordMatch = existingUser.password === password;
        if (!isPasswordMatch) {
            throw new AppError("Invalid credentials", 400);
        }

        const jwtToken = generateJwtToken(existingUser._id.toString());

        return {
            user: existingUser,
            jwtToken
        };
    }
}

export const authService = new AuthService();
