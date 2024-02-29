import mongoose, { Document, Schema, mongo } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: false },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
