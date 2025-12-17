import express from "express";
import authRouter from "./routes/auth.router.js";
import handleError from "./utils/error/errorHandler.js";
import userRouter from "./routes/user.route.js"
import cookieParser from "cookie-parser"

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use("/auth", authRouter);
app.use("/user", userRouter)

app.use(handleError)

export default app;
