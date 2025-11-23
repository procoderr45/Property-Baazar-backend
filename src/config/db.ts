import mongoose from "mongoose";
import { getTypedEnv } from "./env.js";

const env = getTypedEnv();

async function connectToDb() {
    try {
        await mongoose.connect(env.MONGO_URI);
        console.log("Connected to DB")
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

export default connectToDb;
