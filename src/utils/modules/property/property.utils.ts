import { AddPropertyType, EditPropertyType } from "../../../types/property/property.type.js";
import { AppError } from "../../error/AppError.js";
import { validPropertyCategories, validPropertyOwnerTypes } from "./property.constants.js";

export function validateNewPropertyData(propertyData: AddPropertyType) {

    //TODO: install zod and apply zop validations
    let { title, description, price, address, category, type, googleMapLink, geoLocation, furnishingStatus, areaInSquareMeter, facing } = propertyData;
    const { ownership, amenities, nearByAttractions, age, isPriceNegotiable, maintainanceCost, securityCost, sellType } = propertyData;

    title = title.trim();
    description = description.trim();
    googleMapLink = googleMapLink.trim();

    if (!title || title.length < 3) {
        throw new AppError("Title must be atleast 3 characters long", 400);
    }

    if (!price || typeof price !== "number" || price <= 0) {
        throw new AppError("Price must be valid number and greator than 0", 400)
    }

    if (!address || typeof address !== "object" || !address.city || !address.pincode || !address.state || !address.country) {
        throw new AppError("Property address must be valid", 400)
    }

    //TODO: add addresss validation later
    if (!geoLocation || !geoLocation.latitude || typeof geoLocation.latitude !== "number" || !geoLocation.longitude || typeof geoLocation.longitude !== "number") {
        throw new AppError("Geolocation is invalid", 400);
    }

    if (!areaInSquareMeter || typeof areaInSquareMeter !== "number" || areaInSquareMeter <= 0) {
        throw new AppError("Please provide valid area in sq. meter", 400);
    }

    if (!category || !validPropertyCategories.includes(category)) {
        throw new AppError("Please provide valid category", 400);
    }

    if (!ownership || (!validPropertyOwnerTypes.includes(ownership))) {
        throw new AppError("Only property owners, agents or lessee (tenants) can add properties", 400)
    }

    if (maintainanceCost && (typeof maintainanceCost !== "number" || maintainanceCost < 0)) {
        throw new AppError("Maintainance cost must be greator than or equal 0", 400);
    }

    if (securityCost && (typeof securityCost !== "number" || securityCost < 0)) {
        throw new AppError("Security cost must be greator than or equal to 0", 400);
    }

    if (!sellType || (sellType !== "contract" && sellType !== "rent" && sellType !== "sell")) {
        throw new AppError("Please provide valid property sell type", 400)
    }

    if ((!type) || type !== "Open plot" && type !== "Agricultural Plot" && type !== "Mixed-use Plot" && (!age || !facing)) {
        throw new AppError("Please provide valid property facing direction and age (in years).", 400);
    }

    if (facing && (facing !== "south" && facing !== "east" && facing !== "north" && facing !== "west")) {
        throw new AppError("Please provide valid property facing direction", 400);
    }

    return propertyData;
}

export function validateEditPropertyData(propertyData: EditPropertyType) {
    //TODO: install zod and apply zop validations
    let { title, description, price, address, category, type, googleMapLink, geoLocation, furnishingStatus, areaInSquareMeter, facing } = propertyData;
    const { ownership, amenities, nearByAttractions, age, isPriceNegotiable, maintainanceCost, securityCost, sellType } = propertyData;

    if (title && title.length < 3) {
        throw new AppError("Title must be atleast 3 characters long", 400);
    }

    if (price && (typeof price !== "number" || price <= 0)) {
        throw new AppError("Price must be valid number and greator than 0", 400)
    }

    if (address && (typeof address !== "object" || !address.city || !address.pincode || !address.state || !address.country)) {
        throw new AppError("Property address must be valid", 400)
    }

    //TODO: add addresss validation later
    if (geoLocation && (!geoLocation.latitude || typeof geoLocation.latitude !== "number" || !geoLocation.longitude || typeof geoLocation.longitude !== "number")) {
        throw new AppError("Geolocation is invalid", 400);
    }

    if (areaInSquareMeter && (typeof areaInSquareMeter !== "number" || areaInSquareMeter <= 0)) {
        throw new AppError("Please provide valid area in sq. meter", 400);
    }

    if (category && !validPropertyCategories.includes(category)) {
        throw new AppError("Please provide valid category", 400);
    }

    if (ownership && (!validPropertyOwnerTypes.includes(ownership))) {
        throw new AppError("Only property owners, agents or lessee (tenants) can add properties", 400)
    }

    if (maintainanceCost && (typeof maintainanceCost !== "number" || maintainanceCost < 0)) {
        throw new AppError("Maintainance cost must be greator than or equal 0", 400);
    }

    if (securityCost && (typeof securityCost !== "number" || securityCost < 0)) {
        throw new AppError("Security cost must be greator than or equal to 0", 400);
    }

    if (sellType && (sellType !== "contract" && sellType !== "rent" && sellType !== "sell")) {
        throw new AppError("Please provide valid property sell type", 400)
    }

    if (type && type !== "Open plot" && type !== "Agricultural Plot" && type !== "Mixed-use Plot" && (!age || !facing)) {
        throw new AppError("Please provide valid property facing direction and age (in years).", 400);
    }

    if (facing && (facing !== "south" && facing !== "east" && facing !== "north" && facing !== "west")) {
        throw new AppError("Please provide valid property facing direction", 400);
    }

    return propertyData;
}