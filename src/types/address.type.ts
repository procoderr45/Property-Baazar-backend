export interface Address {
    street?: string;
    city: string;
    pincode?: number;
    state: string;
    country: string;
    location?: LocationCoordinate;
}

//for mongodb 2dsphere index
export interface LocationCoordinate {
    type: "Point",
    coordinates: [number, number]
}