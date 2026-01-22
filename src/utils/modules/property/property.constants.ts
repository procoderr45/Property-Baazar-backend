export const MAX_PROPERTY_TITLE_LENGTH = 75;
export const MAX_PROPERTY_DESCRIPTION_LENGTH = 900;
export const MAX_PROPERTY_LOCATION_LENGTH = 150;
export const MAX_PROPERTY_SIZE_IN_SQ = 8;

export const validAttachmentTypes = [
    "video",
    "image",
    "pdf",
    "audio",
    "txt"
]

export const validPropertySellTypes = [
    "sell",
    "rent",
    "contract"
]

export const validPropertyOwnerTypes = [
    "freehold",
    "leasehold",
    "authorised_agent"
] as const;

export const validPropertyCategories = [
    "residential",
    "commercial",
    "plot",
] as const;

export const validPropertyStatus = [
    "active",
    "draft",
    "inactive",
    "sold",
    "rented",
    "expired"
] as const;

export const validResidentialProperties = [
    "Bunglow",
    "flat",
    "apartment",
    "Hostel",
    "Room",
    "Villa",
    "Hotel",
    "PG (Paying guest)",
    "Mixed-use residency"
] as const;

export const validCommercialProperties = [
    "Office / Workspace",
    "Food and Beverage",
    "Education / Training",
    "Healthcare",
    "Mixed-use commercial"
] as const;

export const validPlotProperties = [
    "Agricultural Plot",
    "Open plot",
    "Mixed-use Plot"
] as const;