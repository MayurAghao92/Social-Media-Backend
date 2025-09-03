import postModel from "../models/post.model.js";
import generateCaption from "../services/ai.service.js";
import uuid from "uuid";
import uploadImage from "../services/storage.service.js";

async function createPostController(req, res){
    const file=req.file;
    console.log(file);

    const base64Image= new Buffer.from(file.buffer).toString("base64");
    

    const caption=await generateCaption(base64Image);
    res.status(201).json({
        caption,
    })
}

export {createPostController};