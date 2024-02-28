import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { Promise } from "es6-promise";
import { signIn } from "next-auth/react";
import { SessionStrategy } from "next-auth";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const user = { id: "1" };
        return user;
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };