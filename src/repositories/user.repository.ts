import UserModel from "../models/user.model.js";
import { DbUser, SearchProfileFilters, UpdateProfileType, UserRegistrationData, UserType } from "../types/user.type.js";

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

    async findByUserId(userId: string): Promise<DbUser | null> {
        const user = await UserModel.findById(userId);

        return user;
    }

    async updateUserProfile(userId: string, newProfileData: UpdateProfileType): Promise<DbUser | null> {
        const updatedUserProfile = await UserModel.findByIdAndUpdate(userId, {
            $set: newProfileData
        }, {
            runValidators: true,
            returnDocument: 'after',
        })

        return updatedUserProfile;
    }

    async searchProfiles(profileFilters: any): Promise<DbUser[] | null> {
        console.log("Profile ", profileFilters);
        
        const searchResult = await UserModel.find(profileFilters, "-email -password -updatedAt -contact -age")
        console.log(searchResult);

        return searchResult;
    }
}

export const userRepository = new UserRepository();
