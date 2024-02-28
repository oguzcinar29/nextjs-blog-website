"use client";
import { error } from "console";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

  const router = useRouter();

  const [err, setErr] = useState<string>("");

  const infoChange = (e: any) => {
    console.log(e.target.name);
    setInfo((prevVal) => {
      return { ...prevVal, [e.target.name]: e.target.value };
    });
  };

  const loginSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        ...info,
        redirect: false,
      });
      if (res.error) {
        setErr("Invalid Credentials");
        return;
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={loginSubmit}
        className="flex flex-col gap-6 bg-[#535C91] w-1/3 p-7 text-center rounded-sm "
      >
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
        <button type="submit" className="bg-[#1B1A55] pt-3 pb-3 rounded-sm">
          Sign in
        </button>
        {err && <h2>{err}</h2>}
        <span className="font-light">
          Dont have an account ?
          <Link className="font-extrabold pl-1" href="/register">
            Register
          </Link>
        </span>
      </form>
    </div>
  );
}
