import UserModel from "../models/user.model.js";
import { DbUser, UserRegistrationData, UserType } from "../types/user.type.js";

class UserRepository {
    async register(user: UserRegistrationData): Promise<DbUser> {
        const newUser = await UserModel.create({
            ...user,
        });

        return newUser;
    }

    async findByEmail(email: string): Promise<DbUser | null> {
        const user = await UserModel.findOne({
            email,
        });

        return user;
    }
}

export const userRepository = new UserRepository();
