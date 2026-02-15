import { ObjectId } from "mongoose";
import { validCommercialProperties, validPlotProperties, validPropertyCategories, validPropertyOwnerTypes, validPropertyStatus, validResidentialProperties } from "../../utils/modules/property/property.constants.js";
import { Address } from "../address.type.js";

// Types for property type
export type PropertyCategoryType = typeof validPropertyCategories[number];
export type ResidentialPropertyType = typeof validResidentialProperties[number];
export type CommercialPropertyType = typeof validCommercialProperties[number];
export type PlotPropertyType = typeof validPlotProperties[number];

//Types for property furnishing
export type PropertyFurnishingStatus = "fully_furnished" | "semi_furnished" | "un_furnished";

//Type for property facing direction
export type PropertyFacingDirection = "south" | "east" | "west" | "north";

//Type for property ownership
export type PropertyOwnershipType = typeof validPropertyOwnerTypes[number];

export type AmenityType = {
    title: string;
    iconUrl?: string;
}

export type PropertyAmenity = {
    amenity: string; // id of amenity stored in mongodb
    referenceLink?: string;
    attachments?: string[]; // this will be array of links of file uploaded on S3 bucket
    description?: string;
}

export type PropertyFeature = {
    title: string;
    iconUrl: string;
    type: "amenity" | "nearby_attraction";
}


export type PropertyNearByAttraction = {
    attraction: string; // id of near by attraction stored in NearByAttractions collection
    distance: number; // distance from property location to attraction in KMs
    description?: string;
    referenceLink?: string;
    attachments?: string[] // links of files store on s3 bucket, uploaded by seller or agent
}

export type PropertyVerificationStatus = "pending" | "approved" | "rejected" | "paused"

export type PropertyStatus = typeof validPropertyStatus[number];

export type PropertyGeoLocation = {
    latitude: number;
    longitude: number;
}

export type PropertySellType = "sell" | "rent" | "contract";

//TODO: add attachments field that stores the s3 keys for files uploaded for the property
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
    age?: number; // age of property which represents how old is property but only when property type is residential or commercial , since open plots cannot have age
    isPriceNegotiable: boolean;
    maintainanceCost?: number;
    securityCost?: number;
    sellType: PropertySellType;
    managedBy: ObjectId[]; // id of users who have posted this property
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