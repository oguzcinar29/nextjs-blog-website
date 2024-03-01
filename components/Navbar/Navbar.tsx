"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { BlogContext, blogContextType } from "../context/BlogContext";

export default function Navbar() {
  const { link, setLink } = useContext<blogContextType>(BlogContext);

  console.log(link);

  const changeHover = (e: any) => {
    const link = e.target.textContent;
    if (link === "Oguz") {
      setLink("Homepage");
    } else {
      setLink(link);
    }
  };

  const { data: session } = useSession();

  return (
    <nav>
      <div className="flex justify-between pt-7 pb-7 items-center">
        <Link href="/">
          <h1 onClick={changeHover} className="text-3xl font-bold">
            Oguz
          </h1>
        </Link>
        <div className="flex gap-1">
          <Link
            className={
              link === "Homepage"
                ? "bg-white rounded-3xl p-3 pr-7 pl-7 text-black"
                : "text-white p-3 pr-7 pl-7"
            }
            onClick={changeHover}
            href="/"
          >
            Homepage
          </Link>
          <Link
            className={
              link === "About"
                ? "bg-white rounded-3xl p-3 pr-7 pl-7 text-black"
                : "text-white p-3 pr-7 pl-7"
            }
            onClick={changeHover}
            href="/about"
          >
            About
          </Link>
          <Link
            className={
              link === "Contact"
                ? "bg-white rounded-3xl p-3 pr-7 pl-7 text-black"
                : "text-white p-3 pr-7 pl-7"
            }
            onClick={changeHover}
            href="/contact"
          >
            Contact
          </Link>
          <Link
            className={
              link === "Blog"
                ? "bg-white rounded-3xl p-3 pr-7 pl-7 text-black"
                : "text-white p-3 pr-7 pl-7"
            }
            onClick={changeHover}
            href="/blog"
          >
            Blog
          </Link>
          {typeof session?.user?.email !== "undefined" && (
            <Link
              className={
                link === "Write"
                  ? "bg-white rounded-3xl p-3 pr-7 pl-7 text-black"
                  : "text-white p-3 pr-7 pl-7"
              }
              onClick={changeHover}
              href="/write"
            >
              Write
            </Link>
          )}
          {typeof session?.user?.email === "undefined" && (
            <Link
              className={
                link === "Login"
                  ? "bg-white rounded-3xl p-3 pr-7 pl-7 text-black"
                  : "text-white p-3 pr-7 pl-7"
              }
              onClick={changeHover}
              href="/login"
            >
              Login
            </Link>
          )}
          {typeof session?.user?.email !== "undefined" && (
            <button
              onClick={() => {
                setLink("Homepage");
                signOut();
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
