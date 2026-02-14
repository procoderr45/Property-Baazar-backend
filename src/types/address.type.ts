export interface Address {
    street?: string;
    city: string;
    pincode?: number;
    state: string;
    country: string;
    location?: LocationCoordinateType;
}

//for mongodb 2dsphere index
export type LocationCoordinateType = {
    type: "Point",
    coordinates: [number, number]
}