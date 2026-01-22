import mongoose from "mongoose";
import { MAX_PROPERTY_DESCRIPTION_LENGTH, MAX_PROPERTY_LOCATION_LENGTH, MAX_PROPERTY_SIZE_IN_SQ, MAX_PROPERTY_TITLE_LENGTH, validPropertyCategories, validPropertyOwnerTypes, validPropertySellTypes, validPropertyStatus } from "../utils/modules/property/property.constants.js";
import { PropertyGeoLocation, PropertyType } from "../types/property/property.type.js";

const geoLocationSchema = new mongoose.Schema<PropertyGeoLocation>({
    latitude: {
        type: Number,
        required: [true, "Property location invalid"]
    },
    longitude: {
        type: Number,
        required: [true, "Property location invalid"]
    }
}, {
    _id: false
})

//TODO: add attachments field to show files uploaded for the property
const propertySchema = new mongoose.Schema<PropertyType>({
    title: {
        type: String,
        trim: true,
        required: [true, "Title is required"],
        maxLength: [MAX_PROPERTY_TITLE_LENGTH, `Title should not exceed ${MAX_PROPERTY_TITLE_LENGTH} characters`]
    },
    description: {
        type: String,
        trim: true,
        maxLength: [MAX_PROPERTY_DESCRIPTION_LENGTH, `Description should not exceed ${MAX_PROPERTY_DESCRIPTION_LENGTH} characters`]
    },
    location: {
        type: String,
        trim: true,
        required: [true, "Location of property is required"],
        maxLength: [MAX_PROPERTY_LOCATION_LENGTH, `Location should not exceed ${MAX_PROPERTY_LOCATION_LENGTH} characters`] 
    },
    geoLocation: {
        type: geoLocationSchema,
        required: [true, "Invalid property location."]
    },
    googleMapLink: {
        type: String,
        required: [true, "Please provide valid google maps links of property"],
        trim: true
    },
    category: {
        type: String,
        required: [true, "Please provide category"],
        enum: {
            values: validPropertyCategories,
            message: "{VALUE} is invalid category"
        }
    },
    type: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
    },
    facing: {
        type: String,
    },
    furnishingStatus: {
        type: String,
    },
    areaInSquareMeter: {
        type: Number,
        required: [true, "Please provide area in sq. meter of property"],
        min: [MAX_PROPERTY_SIZE_IN_SQ, `Area must be atleast ${MAX_PROPERTY_SIZE_IN_SQ} sq. meter`],
    },
    age: {
        type: Number,
    },
    isPriceNegotiable: {
        type: Boolean,
        default: false,
    },
    sellType: {
        type: String,
        required: [true, "Property sell type is required"],
        enum: {
            values: validPropertySellTypes,
            message: "Property sell type is invalid"
        }
    },
    ownership: {
        type: String,
        required: [true, "Please provide your ownership type with this property"],
        enum: {
            values: validPropertyOwnerTypes,
            message: "Property ownership is invalid"
        }
    },
    maintainanceCost: {
        type: Number,
    },
    securityCost: {
        type: Number,
    },
    amenities: {
        type: [String],
        ref: "Amenity"
    },
    nearByAttractions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "nearbyAttraction"
    },
    verificationStatus: {
        type: String,
        default: "pending",
        enum: {
            values: ["pending", "approved", "rejected", "paused"],
            message: "{VALUE} is invalid verification status"
        }
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    likesCount: {
        type: Number,
        default: 0
    },
    managedBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Posted by is invalid"]
    },
    reportCount: {
        type: Number,
        default: 0
    },
    shareCount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        required: [true, "Invalid property status"],
        enum: {
            values: validPropertyStatus,
            message: "{VALUE} is invalid property status"
        },
        default: "active"
    }
}, {
    timestamps: true
})

const PropertyModel = mongoose.model("Property", propertySchema);

export default PropertyModel;