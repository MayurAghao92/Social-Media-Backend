import express from "express";
import userRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";


const app=express();
app.use(express.json());
app.use(cookieParser());
app.use('/auth',userRouter)

export default app;