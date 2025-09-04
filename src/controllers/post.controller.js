import postModel from "../models/post.model.js";
import generateCaption from "../services/ai.service.js";
import {v4 as uuidv4 } from "uuid";
import uploadFile from "../services/storage.service.js";

async function createPostController(req, res){
   try{
     const file=req.file;
    
    const base64Image=Buffer.from(file.buffer).toString("base64");
    
    const caption = req.body.caption;
    const result=await uploadFile(file.buffer,`${uuidv4()}`);

    const newPost=await postModel.create({
        caption:caption,
        image:result.url,
        user:req.user._id,
    })
    res.status(201).json({
        message:"Post created successfully",
        post:newPost,
    })

   }catch(err){
    console.error("Error in createPostController:", err);
    res.status(500).json({
        message:"Internal Server Error",
    })
   }
}


async function getAllPostsController(req, res){
  try {
    const posts = await postModel.find().populate("user", "username").sort({ createdAt: -1 }); // optional populate user info
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error in getAllPostsController:", err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};



export {createPostController, getAllPostsController};