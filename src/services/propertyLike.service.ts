import { propertyRepository } from "../repositories/property.repository.js";
import { propertyLikeRepository } from "../repositories/propertyLike.repository.js";
import { AppError } from "../utils/error/AppError.js";

class PropertyLikeService {
    async likeProperty(propertyId: string, userId: string) {
        if (!propertyId) {
            throw new AppError("Invalid property id", 400);
        }

        if (!userId) {
            throw new AppError("Invalid user id", 400);
        }

        const property = await propertyRepository.getProperty(propertyId);
        if (!property || property.isDeleted) {
            throw new AppError("Property not found", 404);
        }

        const isLiked = await propertyLikeRepository.isPropertyLiked(propertyId, userId);
        if(isLiked) {
            throw new AppError("Property is already liked", 400);
        }

        const newLikes = await propertyLikeRepository.likeProperty(propertyId, userId);

        return newLikes;
    }

    async unlikeProperty(propertyId: string, userId: string): Promise<number> {
        if (!propertyId) {
            throw new AppError("Invalid property id", 400);
        }

        if(!userId) {
            throw new AppError("Invalid user id", 400);
        }

        const property = await propertyRepository.getProperty(propertyId);
        if(!property || property.isDeleted) {
            throw new AppError("Property not found", 404);
        }

        const newLikes = await propertyLikeRepository.unlikeProperty(propertyId, userId);

        return newLikes;
    }
}

export const propertyLikeService = new PropertyLikeService();