import mongoose, { Document, Schema, mongo } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
