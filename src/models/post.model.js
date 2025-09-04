import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  image: String,
  caption: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt:{
    type:Date,
    default:Date.now,
  }
});

const postModel = mongoose.model("posts", postSchema);

export default postModel;