import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createPostController,getAllPostsController,deletePostController, likePostController } from "../controllers/post.controller.js";
import multer from "multer";

const upload=multer({storage:multer.memoryStorage()})

const router = express.Router();

router.post("/", authMiddleware,upload.single("image"),createPostController);
router.get("/", authMiddleware, getAllPostsController)
router.delete("/:id",authMiddleware, deletePostController)
router.put("/:id/like", authMiddleware, likePostController);

export default router;
