import mongoose from "mongoose";
import { date } from "yup";

const postSchema = new mongoose.Schema({
  user: String,
  post: String,
  caption: String,
  likes: [{ type: String}],
  comments: [
    {
      type: String,
      comment: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.models.posts || mongoose.model("posts", postSchema);

export default Post;
