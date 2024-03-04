"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="mt-12 h-homepage 800:pt-32  ">
      <div className="flex justify-between 800:justify-center items-center gap-10 ">
        <div className="800:min-w-full w-7/12 flex flex-col gap-5 ">
          <h1 className="500:text-6xl text-white  text-7xl font-extrabold leading-tight">
            Creative Thoughts Agency.
          </h1>
          <p className="leading-snug font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
          </p>
          <div className="flex gap-4">
            <Link
              className="bg-blue-500 p-6 rounded-lg pt-4 pb-4"
              href="/about"
            >
              Learn More
            </Link>
            <Link
              className="bg-white text-black p-6 rounded-lg pt-4 pb-4"
              href="/contact"
            >
              Contact
            </Link>
          </div>
          <div>
            <img
              src="https://github.com/safak/next14-tutorial/blob/main/public/brands.png?raw=true"
              alt=""
            />
          </div>
        </div>
        <div className="w-5/12">
          <img
            className="800:hidden"
            src="https://github.com/safak/next14-tutorial/blob/main/public/hero.gif?raw=true"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
