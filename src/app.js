import express from "express";
import userRouter from "./routes/auth.routes.js";
import postRouter from "./routes/posts.route.js";
import captionRouter from "./routes/caption.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app=express();

// Fix: Better CORS configuration for production
const allowedOrigins = [
  'http://localhost:5173', // Development
  'https://social-media-two-alpha.vercel.app', // Your frontend URL
  // Add your actual production frontend URL here
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie'],
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',userRouter)
app.use('/api/posts',postRouter)
app.use('/api/caption',captionRouter)

export default app;