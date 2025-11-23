import dotenv from "dotenv";
dotenv.config();

export function getEnv(key: string, defaultValue?: string): string {
    const value = process.env[key] ?? defaultValue;

    if (!value) {
        throw new Error(`Env variable missing - ${key}`);
    }

    return value;
}

export function getTypedEnv() {
    return {
        PORT: parseInt(getEnv("PORT", "5000")),
        MONGO_URI: getEnv("MONGO_URI"),
        JWT_SECRET: getEnv("JWT_SECRET"),
        AWS_ACCESS_KEY: getEnv("AWS_ACCESS_KEY"),
        AWS_SECRET_KEY: getEnv("AWS_SECRET_KEY"),
        STRIPE_SECRET_KEY: getEnv("STRIPE_ACCESS_KEY"),
    };
}
