import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();
    const data = await User.find();
    console.log(data);

    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Website went creash" },
      { status: 500 }
    );
  }
}
