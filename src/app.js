import express from "express";
import userRouter from "./routes/auth.routes.js";
import postRouter from "./routes/posts.route.js";
import cookieParser from "cookie-parser";

const app=express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',userRouter)
app.use('/api/posts',postRouter)

export default app;