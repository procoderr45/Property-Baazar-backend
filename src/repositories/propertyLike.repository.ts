import PropertyModel from "../models/property.model.js";
import PropertyLikeModel from "../models/propertyLike.model.js";
import { AppError } from "../utils/error/AppError.js";

class PropertyLikeRepository {
    async likeProperty(propertyId: string, userId: string) {

        const like = new PropertyLikeModel({
            property: propertyId,
            user: userId
        })

        const liked = await like.save();

        const totalLikes = await PropertyModel
            .findByIdAndUpdate(propertyId, {
                $inc: {
                    likesCount: 1
                }
            }, {
                returnDocument: "after",
                runValidators: true
            })
            .select("likesCount")
            .lean();

        return totalLikes?.likesCount;
    }

    async isPropertyLiked(propertyId: string, userId: string): Promise<boolean> {
        const liked = await PropertyLikeModel.findOne({
            property: propertyId,
            user: userId
        })

        return liked ? true : false;
    }

    async unlikeProperty(propertyId: string, userId: string): Promise<number> {

        const result = await PropertyLikeModel.deleteOne({
            property: propertyId,
            user: userId
        })

        if (result.deletedCount == 0) {
            throw new AppError("Property is not liked", 404);
        }

        const totalLikes = await PropertyModel
            .findByIdAndUpdate(propertyId, {
                $inc: {
                    likesCount: -1
                }
            },{
                returnDocument: "after",
                runValidators: true
            })
            .select("likesCount")
            .lean();

        return totalLikes?.likesCount || 0;
    }
}

export const propertyLikeRepository = new PropertyLikeRepository();