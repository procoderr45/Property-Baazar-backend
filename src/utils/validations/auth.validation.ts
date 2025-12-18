import { UserRegistrationData, userTypeValues } from "../../types/user.type.js";
import { AppError } from "../error/AppError.js";

export function isEmail(data: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(data.trim());
}

const validateRegistrationData = (data: UserRegistrationData): UserRegistrationData => {
    if (!data) {
        throw new AppError("Please provide all registration data", 400, true);
    }

    const { email, name, password, contact, role } = data;
    const { countryCode, mobile } = contact;

    if (!email.trim() || !isEmail(email)) {
        throw new AppError("Please provide valid email", 400, true);
    }

    if (!name.trim() || name.length < 3) {
        throw new AppError("Name should contain at least 3 characters", 400, true);
    }

    if (!password) {
        throw new AppError(
            "Password must contain atleast 8 characters and include atleast one uppercase, lowercase, number and special character",
            400
        );
    }

    if (!contact || !countryCode || !countryCode.trim() || mobile.length > 12 || mobile.length < 10) {
        throw new AppError("Please provide valid contact number", 400, true);
    }

    if (!role || !userTypeValues.includes(role)) {
        throw new AppError("Please provide valid role", 400);
    }

    return {
        email,
        name,
        password,
        contact,
        role
    };
};

export { validateRegistrationData };
