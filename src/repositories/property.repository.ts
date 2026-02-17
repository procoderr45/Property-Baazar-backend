import mongoose from "mongoose";
import PropertyModel from "../models/property.model.js";
import SavePropertyModel from "../models/propertySavemodel.js";
import { AddPropertyType, EditPropertyType, PropertyDoc, PropertyType } from "../types/property/property.type.js";
import { PropertySaveType } from "../types/save.type.js";
import { propertyPostedByUserData } from "../utils/modules/property/property.utils.js";

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
        const property = await PropertyModel
            .findById(propertyId)
            .populate({
                path: "postedBy",
                select: "_id name isEmailVerified followersCount followingCount photoUrl accountStatus"
            })
            .populate({
                path: "amenities",
                select: "_id title iconUrl"
            })

        return property;
    }

    async editProperty(propertyId: string, newPropertyData: EditPropertyType): Promise<PropertyDoc | null> {
        const updatedProperty = await PropertyModel.findByIdAndUpdate<PropertyDoc>(propertyId, {
            ...newPropertyData
        }, {
            runValidators: true,
            returnDocument: "after"
        });

        return updatedProperty;
    }

    async saveProperty(propertyId: string, userId: string): Promise<PropertySaveType | null> {
        const toSave = new SavePropertyModel({
            property: propertyId,
            user: userId
        })

        const savedProperty = await toSave.save();

        return savedProperty;
    }

    async unSaveProperty(propertyId: string, userId: string): Promise<PropertySaveType | null> {
        const unSaved = await SavePropertyModel.findOneAndDelete({
            property: new mongoose.Types.ObjectId(propertyId),
            user: new mongoose.Types.ObjectId(userId)
        })

        return unSaved;

    }

    async getMySavedProperties(userId: string, skip: number, limit: number): Promise<PropertySaveType[]> {
        const savedProperties = await SavePropertyModel
            .find({ user: new mongoose.Types.ObjectId(userId) })
            .skip(skip)
            .limit(limit)
            .populate({
                path: "property",
                select: "-amenities -description -nearByAttractions -managedBy -isPriceNegotiable -ownership -facing -furnishingStatus -type -category -parkingAvailable -__v -age -address.street -updatedAt -shareCount -reportCount",
                populate: {
                    path: "postedBy",
                    select: "name _id role isEmailVerified photoUrl accountStatus "
                }
            })
            .select("-user -updatedAt -__v")
            .lean();

        return savedProperties;

    }
}

export const propertyRepository = new PropertyRepository();