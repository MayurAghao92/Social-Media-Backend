import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  image: String,
  caption: String,
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const postModel = mongoose.model("posts", postSchema);

export default postModel;