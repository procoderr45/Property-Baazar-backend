import express from "express";
import authRouter from "./routes/auth.router.js";
import handleError from "./utils/error/errorHandler.js";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);


app.use(handleError)

export default app;
