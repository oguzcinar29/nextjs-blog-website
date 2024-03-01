import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }) {
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
