import express, { urlencoded } from "express";
import authRouter from "./routes/auth.router.js";
import handleError from "./utils/error/errorHandler.js";
import userRouter from "./routes/user.route.js"
import cookieParser from "cookie-parser"
import uploadRouter from "./routes/upload.route.js"
import propertyRouter from "./routes/property.route.js"

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use("/user", userRouter)
app.use("/upload", uploadRouter);

app.post("/health", (req, res) => {
    res.send("Backend is alive");
});


app.use("/property", propertyRouter);

app.use(handleError)

export default app;
