import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: any) {
  const { id } = params;
  console.log(id);
  try {
    await connectMongoDB();
    await Post.findByIdAndDelete(id);
    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Invalid Server" }, { status: 500 });
  }
}
export async function PUT(request: NextRequest, { params }: any) {
  const { id } = params;

  const data = await request.formData();
  const title = data.get("title");
  const text = data.get("text");
  const date = data.get("date");
  const file: File | null = data.get("postImage") as unknown as File;
  const userId = data.get("userId");

  let blob: any;
  if (typeof file.name !== "undefined") {
    blob = await put(file.name, file, {
      access: "public",
    });
  }

  let oldImg: any;
  if (typeof blob === "undefined") {
    const post = await Post.findById(id);
    console.log(post);
    oldImg = post.image;
  }

  try {
    await connectMongoDB();
    await Post.findByIdAndUpdate(id, {
      title: title,
      text: text,
      date: date,
      image: typeof blob !== "undefined" ? blob.url : oldImg,
      userId: userId,
    });
    return NextResponse.json(
      { message: "Data has been changed successfuly" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Invalid value" }, { status: 500 });
  }
}
