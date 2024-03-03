import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { join } from "path";
import { writeFile } from "fs/promises";
import { put } from "@vercel/blob";
import BlogUser from "@/models/user";

const saltRounds = 11;

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    console.log(data);

    const password = data.get("password") as string;
    const email = data.get("email") as string;
    const name = data.get("name") as string;
    const file: File | null = data.get("file") as unknown as File;

    let blob: any;
    if (typeof file.name !== "undefined") {
      blob = await put(file.name, file, {
        access: "public",
      });
    }

    await connectMongoDB();
    const newPass = await bcrypt.hash(password, saltRounds);

    const findEmail = BlogUser.find({ email });
    if ((await findEmail).length !== 0) {
      console.log("hey3");

      return NextResponse.json(
        { message: "Email already exist! Try to login." },
        { status: 422 }
      );
    } else {
      await BlogUser.create({
        name: name,
        email: email,
        password: newPass,
        image: typeof file.name !== "undefined" ? blob.url : null,
      });
      return NextResponse.json({ message: "User created" }, { status: 200 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "An error occured while registering the user." },
      { status: 500 }
    );
  }
}
