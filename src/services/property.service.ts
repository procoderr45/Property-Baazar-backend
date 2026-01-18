import { propertyRepository } from "../repositories/property.repository.js";
import { AddPropertyType, PropertyDoc, PropertyType } from "../types/property.type.js";
import { validateNewPropertyData } from "../utils/modules/property/property.utils.js";

class PropertyService {
    async createProperty(postedBy: string, propertyData: AddPropertyType): Promise<PropertyType> {

        const validPropertyData = validateNewPropertyData(propertyData);

        const newProperty = await propertyRepository.createProperty(postedBy, validPropertyData);
        
        return newProperty;
    }

    async getProperty(propertyId: string): Promise<PropertyType | null> {
        const property = await propertyRepository.getProperty(propertyId);

        return property;
    }
}

export const propertyService = new PropertyService();