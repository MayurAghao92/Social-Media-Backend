import postModel from "../models/post.model.js";
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
    const posts = await postModel.find().populate("user", "username").sort({ createdAt: -1 }); 
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error in getAllPostsController:", err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

async function deletePostController(req, res){
  try {
    const postId = req.params.id;

    const post = await postModel.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });    

    await postModel.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function likePostController (req, res){
  try {
    const postId = req.params.id;
    const userId = req.user._id; 

    const post = await postModel.findById(postId);
    if (!post.likes) post.likes = [];

    const index = post.likes.findIndex(id => id.toString() === userId.toString());
    if (index === -1) {
      post.likes.push(userId); 
    } else {
      post.likes.splice(index, 1); 
    }

    await post.save();

    res.status(200).json({
      message: index === -1 ? "Post liked" : "Post unliked",
      likes: post.likes.length,
    });
  } catch (err) {
    console.error("Error liking post:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};



export {createPostController, getAllPostsController, deletePostController, likePostController};