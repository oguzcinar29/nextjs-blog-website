"use client";
import Link from "next/link";
import React, { useState } from "react";

type infoType = {
  email: string;
  password: string;
};

export default function Login() {
  const [info, setInfo] = useState<infoType>({
    email: "",
    password: "",
  });

  const infoChange = (e: any) => {
    console.log(e.target.name);
    setInfo((prevVal) => {
      return { ...prevVal, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col gap-6 bg-[#535C91] w-1/3 p-7 text-center rounded-sm ">
        <h1 className="text-3xl font-extrabold">Login</h1>
        <input
          onChange={infoChange}
          value={info?.email}
          type="text"
          placeholder="Email"
          name="email"
          className="bg-[#070F2B] p-3 text-white  w-full  rounded-sm "
        />
        <input
          onChange={infoChange}
          value={info?.password}
          name="password"
          type="password"
          placeholder="Password"
          className="bg-[#070F2B] p-3 text-white w-full  rounded-sm "
        />
        <button className="bg-[#1B1A55] pt-3 pb-3 rounded-sm">Sign in</button>
        <span className="font-light">
          Dont have an account ?
          <Link className="font-extrabold pl-1" href="/register">
            Register
          </Link>
        </span>
      </div>
    </div>
  );
}
