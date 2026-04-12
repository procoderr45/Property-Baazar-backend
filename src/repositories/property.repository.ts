import mongoose from "mongoose";
import PropertyModel from "../models/property.model.js";
import SavePropertyModel from "../models/propertySavemodel.js";
import { AddPropertyType, EditPropertyType, PropertyDoc, PropertyType } from "../types/property/property.type.js";
import { PropertySaveType } from "../types/save.type.js";
import { propertyPostedByUserData } from "../utils/modules/property/property.utils.js";
import { AppError } from "../utils/error/AppError.js";
import { PROPERTIES_PER_PAGE_LIMIT } from "../utils/constants.js";

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

    async getPropertiesNearMe(latitude: number, longitude: number): Promise<PropertyType[]> {
        const properties =
            await PropertyModel.find({
                "address.location": {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [longitude, latitude]
                        },
                        $maxDistance: 50000
                    }
                }
            })
                .populate({
                    path: "amenities",
                    select: "-createdAt -updatedAt"
                })
                .populate({
                    path: "postedBy",
                    select: propertyPostedByUserData
                })

        return properties;
    }

    async deleteProperty(propertyId: string): Promise<boolean> {
        const deletedProperty = await PropertyModel.findByIdAndUpdate(propertyId, {
            isDeleted: true,
        }, {
            returnDocument: "after"
        })

        if(!deletedProperty) {
            throw new AppError("Property not found", 404);
        }

        if(!deletedProperty.isDeleted) {
            throw new AppError("Unable to delete property. Please try after some time.", 400);
        }

        return true;
    }

    async feedProperties(page: number, filters: any) {
        const skip = (page - 1) * PROPERTIES_PER_PAGE_LIMIT;

        const properties = await PropertyModel
            .find(filters)
            .select("title description price address furnishingStatus areaInSquareMeter sellType")
            .skip(skip)
            .limit(PROPERTIES_PER_PAGE_LIMIT)
            .sort({ createdAt: -1 })
        return properties;
    }
}

export const propertyRepository = new PropertyRepository();