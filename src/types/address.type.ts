export interface Address {
    street?: string;
    city: string;
    pincode?: number;
    state: string;
    country: string;
    location?: Location;
}

//for mongodb 2dsphere index
export interface LocationCoordinate {
    type: "Point",
    coordinates: [number, number]
}