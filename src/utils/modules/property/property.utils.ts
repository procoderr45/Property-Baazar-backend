import { AddPropertyType } from "../../../types/property.type.js";
import { AppError } from "../../error/AppError.js";
import { validPropertyCategories, validPropertyOwnerTypes } from "./property.constants.js";

export function validateNewPropertyData(propertyData: AddPropertyType) {

    //TODO: install zod and apply zop validations
    let { title, description, price, location, category, type, googleMapLink, geoLocation, furnishingStatus, areaInSquareMeter, facing } = propertyData;
    const { ownership, amenities, nearByAttractions, age, isPriceNegotiable, maintainanceCost, securityCost, sellType } = propertyData;
    
    title = title.trim();
    description = description.trim();
    location = location.trim();
    googleMapLink = googleMapLink.trim();

    if(!title || title.length < 3) {
        throw new AppError("Title must be atleast 3 characters long", 400);
    }

    if(!price || typeof price !== "number" || price <= 0) {
        throw new AppError("Price must be valid number and greator than 0", 400)
    }

    if(!location || location.length < 3) {
        throw new AppError("Location must be at least 3 characters long", 404)
    }

    if(!geoLocation || !geoLocation.latitude || typeof geoLocation.latitude !== "number" || !geoLocation.longitude || typeof geoLocation.longitude !== "number") {
        throw new AppError("Geolocation is invalid", 400);
    }

    if(!areaInSquareMeter || typeof areaInSquareMeter !== "number" || areaInSquareMeter <= 0) {
        throw new AppError("Area in sq. meter is invalid", 400);
    }

    if(!validPropertyCategories.includes(category)) {
        throw new AppError("Category is invalid", 400);
    }

    if(!ownership || (!validPropertyOwnerTypes.includes(ownership))) {
        throw new AppError("Only property owners, agents or lessee (tenants) can add properties", 400)
    }

    if(maintainanceCost && (typeof maintainanceCost !== "number" || maintainanceCost < 0)) {
        throw new AppError("Maintainance cost must be greator than or equal 0", 400);
    }

    if(securityCost && (typeof securityCost !== "number" || securityCost < 0)) {
        throw new AppError("Security cost must be greator than or equal to 0", 400);
    }

    if(!sellType || (sellType !== "contract" && sellType !== "rent" && sellType !== "sell")) {
        throw new AppError("Sell type is invalid", 400)
    }

    if(type !== "Open plot" && type !== "Agricultural Plot" && type !== "Mixed-use Plot" && (!age || !facing)) {
        throw new AppError("Age or facing direction of property is invalid", 400);
    }
    
    if(facing && (facing !== "south" && facing !== "east" && facing !== "north" && facing !== "west")) {
        throw new AppError("Facing direction of property is invalid", 400);
    }

    return propertyData;
}