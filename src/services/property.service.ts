import AmenityModel from "../models/amenityType.model.js";
import { propertyRepository } from "../repositories/property.repository.js";
import { AddPropertyType, EditPropertyType, PropertyDoc, PropertyType } from "../types/property/property.type.js";
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
            else if(typeof curAmenity === "string") {
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
}

export const propertyService = new PropertyService();