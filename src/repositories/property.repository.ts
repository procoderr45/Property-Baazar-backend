import PropertyModel from "../models/property.model.js";
import { AddPropertyType, PropertyDoc, PropertyType } from "../types/property.type.js";
import { AppError } from "../utils/error/AppError.js";

class PropertyRepository {
    async createProperty(postedBy: string, propertyData: AddPropertyType): Promise<PropertyType> {
        const newProperty = new PropertyModel({
            ...propertyData,
            postedBy
        });

        const property = await newProperty.save();

        return property;
    }

    async getProperty(propertyId: string): Promise<PropertyType | null> {
        const property = await PropertyModel.findById(propertyId).populate("postedBy", "_id name isEmailVerified followersCount followingCount photoUrl accountStatus")

        return property;
    }
}

export const propertyRepository = new PropertyRepository();