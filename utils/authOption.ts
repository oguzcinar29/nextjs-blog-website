import CredentialsProvider from "next-auth/providers/credentials";
import { Promise } from "es6-promise";

import { SessionStrategy } from "next-auth";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials: {
        email: string;
        password: string;
      }): Promise<any> {
        const { email, password } = credentials;
        console.log(email, password);
        console.log("clicked");

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });
          console.log(user);

          if (!user) {
            return null;
          }
          const hashPass = await bcrypt.compare(password, user.password);

          console.log(hashPass);

          if (!hashPass) {
            console.log("123");

            return null;
          } else {
            return user;
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
