import { ObjectId } from "mongoose";
import { validCommercialProperties, validPlotProperties, validPropertyCategories, validPropertyOwnerTypes, validPropertyStatus, validResidentialProperties } from "../../utils/modules/property/property.constants.js";
import { Address } from "../address.type.js";

export type PropertyCategoryType = typeof validPropertyCategories[number];
export type ResidentialPropertyType = typeof validResidentialProperties[number];
export type CommercialPropertyType = typeof validCommercialProperties[number];
export type PlotPropertyType = typeof validPlotProperties[number];

export type PropertyFurnishingStatus = "fully_furnished" | "semi_furnished" | "un_furnished";

export type PropertyFacingDirection = "south" | "east" | "west" | "north";

export type PropertyOwnershipType = typeof validPropertyOwnerTypes[number];

export type AmenityType = {
    title: string;
    iconUrl?: string;
}

export type PropertyAmenity = {
    amenity: string;
    referenceLink?: string;
    attachments?: string[];
    description?: string;
}

export type PropertyFeature = {
    title: string;
    iconUrl: string;
    type: "amenity" | "nearby_attraction";
}


export type PropertyNearByAttraction = {
    attraction: string;
    distance: number;
    description?: string;
    referenceLink?: string;
    attachments?: string[]
}

export type PropertyVerificationStatus = "pending" | "approved" | "rejected" | "paused"

export type PropertyStatus = typeof validPropertyStatus[number];

export type PropertyGeoLocation = {
    latitude: number;
    longitude: number;
}

export type PropertySellType = "sell" | "rent" | "contract";

export type AddPropertyType = {
    title: string;
    description: string;
    price: number;
    address: Address;
    category: PropertyCategoryType;
    type: ResidentialPropertyType | CommercialPropertyType | PlotPropertyType,
    googleMapLink: string;
    geoLocation: PropertyGeoLocation;
    furnishingStatus?: PropertyFurnishingStatus;
    areaInSquareMeter: number;
    facing?: PropertyFacingDirection;
    ownership: PropertyOwnershipType;
    amenities: string[] | AmenityType[];
    nearByAttractions?: PropertyNearByAttraction[];
    age?: number; 
    isPriceNegotiable: boolean;
    maintainanceCost?: number;
    securityCost?: number;
    sellType: PropertySellType;
    managedBy: ObjectId[];
    parkingAvailable: boolean;
    
}

export type PropertyType = AddPropertyType & {
    verificationStatus?: PropertyVerificationStatus;
    isDeleted?: boolean;
    likesCount?: number;
    shareCount?: number;
    reportCount?: number;
    status: PropertyStatus;
    postedBy: ObjectId
}

export type EditPropertyType = Partial<AddPropertyType>

export type PropertyDoc = PropertyType & Document;