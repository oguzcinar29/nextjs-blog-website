import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
  title: string;
  text: string;
  date: string;
  image: string;
  userId: Schema.Types.ObjectId;
}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: false },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
