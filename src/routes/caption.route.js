import express from "express";
import  generateCaptionController  from "../controllers/caption.controller.js";
import multer from "multer";

const upload=multer({storage:multer.memoryStorage()})

const router = express.Router();

router.post('/', upload.single('image'), generateCaptionController);

export default router;
