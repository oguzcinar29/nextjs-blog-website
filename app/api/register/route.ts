import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { join } from "path";
import { writeFile } from "fs/promises";

const saltRounds = 11;

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();

    const password = data.get("password") as string;
    const email = data.get("email") as string;
    const name = data.get("name") as string;
    const file: File | null = data.get("file") as unknown as File;

    console.log(file);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = join("app/api", "images", file.name);
    await writeFile(path, buffer);

    await connectMongoDB();
    const newPass = await bcrypt.hash(password, saltRounds);

    const findEmail = User.find({ email });
    if ((await findEmail).length !== 0) {
      console.log("hey3");

      return NextResponse.json(
        { message: "Email already exist! Try to login." },
        { status: 422 }
      );
    } else {
      await User.create({
        name: name,
        email: email,
        password: newPass,
        image: `/images/${file.name}`,
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
