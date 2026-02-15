import AmenityModel from "../models/amenityType.model.js";
import { propertyRepository } from "../repositories/property.repository.js";
import { AddPropertyType, EditPropertyType, PropertyDoc, PropertyType } from "../types/property/property.type.js";
import { AppError } from "../utils/error/AppError.js";
import { validateEditPropertyData, validateNewPropertyData } from "../utils/modules/property/property.utils.js";

class PropertyService {
    async createProperty(postedBy: string, propertyData: AddPropertyType): Promise<PropertyType> {

        const validPropertyData = validateNewPropertyData(propertyData);
        let propertyAmenityIds: string[] = [];

        for (let curAmenity of (validPropertyData.amenities || [])) {
            if (propertyData.amenities.length > 0 && typeof propertyData.amenities[0] === "object") {
                const amenity = new AmenityModel(curAmenity);
                const amenityDoc = await amenity.save();

                propertyAmenityIds.push(amenityDoc._id.toString());
            }
            else if (typeof curAmenity === "string") {
                propertyAmenityIds.push(curAmenity);
            }
        }

        const newProperty = await propertyRepository.createProperty(postedBy, {
            ...validPropertyData,
            amenities: propertyAmenityIds
        });

        return newProperty;
    }

    async getProperty(propertyId: string): Promise<PropertyType | null> {
        const property = await propertyRepository.getProperty(propertyId);

        return property;
    }

    //TODO: pass only field of property that we want to change
    async editProperty(propertyId: string, newPropertyData: AddPropertyType): Promise<PropertyDoc | null> {
        const validPropertyData = validateEditPropertyData(newPropertyData)

        const updatedProperty = await propertyRepository.editProperty(propertyId, validPropertyData);

        return updatedProperty;
    }

    async saveProperty(propertyId: string, userId: string) {
        const property = await propertyService.getProperty(propertyId);
        if (!property || property.isDeleted) {
            throw new AppError("Property not found, unable to save.", 404);
        }

        const savedProperty = await propertyRepository.saveProperty(propertyId, userId);

        return savedProperty;
    }

    async unSaveProperty(propertyId: string, userId: string) {
        const unSavedProperty = await propertyRepository.unSaveProperty(propertyId, userId);

        if(!unSavedProperty) {
            throw new AppError("Property is not saved.", 404);
        }

        return unSavedProperty;
    }
}

export const propertyService = new PropertyService();