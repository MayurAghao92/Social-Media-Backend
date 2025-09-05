import express from "express";
import userRouter from "./routes/auth.routes.js";
import postRouter from "./routes/posts.route.js";
import captionRouter from "./routes/caption.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app=express();

app.use(cors({
  origin: ['http://localhost:5173',"https://social-media-two-alpha.vercel.app"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',userRouter)
app.use('/api/posts',postRouter)
app.use('/api/caption',captionRouter)

export default app;