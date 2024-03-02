import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path, { join } from "path";

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();
    const data = await Post.find();
    return NextResponse.json({ data }, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { message: "Invalid servor request" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const title = data.get("title");
    const text = data.get("text");
    const date = data.get("date");
    const file: File | null = data.get("postImage") as unknown as File;
    const userId = data.get("userId");
    if (typeof file.name !== "undefined") {
      console.log("21");

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const path = join("public", "postImages", file.name);
      await writeFile(path, buffer);
    }
    console.log(path);

    await connectMongoDB();

    await Post.create({
      title: title,
      text: text,
      date: date,
      userId: userId,
      image:
        typeof file.name !== "undefined" ? `/postImages/${file.name}` : null,
    });
    return NextResponse.json(
      { message: "Post has been shared" },
      { status: 200 }
    );
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { message: "Website went crash" },
      { status: 500 }
    );
  }
}
