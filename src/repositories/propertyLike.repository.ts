import PropertyModel from "../models/property.model.js";
import PropertyLikeModel from "../models/propertyLike.model.js";

class PropertyLikeRepository {
    async likeProperty(propertyId: string, userId: string) {

        const like = new PropertyLikeModel({
            property: propertyId,
            user: userId
        })

        const liked = await like.save();

        const totalLikes = await PropertyModel
            .findByIdAndUpdate(propertyId, {
                $set: {
                    $inc: {
                        likesCount: 1
                    }
                }
            })
            .select("likesCount")
            .lean();

        return totalLikes?.likesCount;
    }
}

export const propertyLikeRepository = new PropertyLikeRepository();