import { connectMongoDB } from "@/lib/mongodb";
import BlogUser from "@/models/user";

import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: any) {
  const { id } = params;
  console.log(id);
  try {
    await connectMongoDB();
    await BlogUser.findByIdAndDelete(id);
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Invalid Server" }, { status: 500 });
  }
}
