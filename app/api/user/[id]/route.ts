import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function DELETE(request: NextRequest, { params }: any) {
  const { id } = params;
  console.log(id);
  try {
    await connectMongoDB();
    await User.findByIdAndDelete(id).populate("creator");
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Invalid Server" }, { status: 500 });
  }
}
