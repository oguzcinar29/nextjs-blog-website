import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const saltRounds = 11;

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    await connectMongoDB();

    const newPass = await bcrypt.hash(password, saltRounds);

    console.log(newPass);

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
