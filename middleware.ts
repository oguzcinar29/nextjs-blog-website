export { default } from "next-auth/middleware";
console.log("middle");

export const config = { matcher: ["/blog"] };
