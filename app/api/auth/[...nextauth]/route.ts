import NextAuth from "next-auth/next";
import { CredentialsProvider } from "next-auth/providers/credentials";
import { Promise } from "es6-promise";
const authOptions = {
  providers: [CredentialsProvider({})],
};
