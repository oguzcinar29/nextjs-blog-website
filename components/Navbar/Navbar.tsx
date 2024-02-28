"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [link, setLink] = useState<string>("Homepage");

  const changeHover = (e: any) => {
    const link = e.target.textContent;
    if (link === "Oguz") {
      setLink("Homepage");
    } else {
      setLink(link);
    }
  };

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
        </div>
      </div>
    </nav>
  );
}