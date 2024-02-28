"use client";
import { apiURL } from "@/url";
import Link from "next/link";
import { userInfo } from "os";
import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";

import { redirect } from "next/navigation";
import { getSession, useSession } from "next-auth/react";

type infoType = {
  name: string;
  email: string;
  password: string;
};

export default function Register() {
  const { data: session } = useSession();

  if (typeof session?.user?.email === "undefined") redirect("/");

  const [info, setInfo] = useState<infoType>({
    name: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState("");

  const router = useRouter();

  const infoChange = (e: any) => {
    console.log(e.target.name);
    setInfo((prevVal) => {
      return { ...prevVal, [e.target.name]: e.target.value };
    });
  };

  const registerSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiURL}/api/register`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(info),
      });
      if (!res.ok) {
        res.json().then((message) => setErr(message.message));
      } else {
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {err && (
        <Stack sx={{ width: "30%", margin: "auto" }} spacing={2}>
          <Alert severity="error">{err}</Alert>
        </Stack>
      )}
      <div className="flex justify-center items-center">
        <form
          onSubmit={registerSubmit}
          className="flex flex-col gap-6 bg-[#535C91] w-1/3 p-7 text-center rounded-sm "
        >
          <h1 className="text-3xl font-extrabold">Register</h1>
          <input
            onChange={infoChange}
            value={info?.name}
            type="text"
            placeholder="Username"
            name="name"
            required
            className="bg-[#070F2B] p-3 text-white  w-full  rounded-sm "
          />
          <input
            onChange={infoChange}
            value={info?.email}
            required
            type="text"
            placeholder="Email"
            name="email"
            className="bg-[#070F2B] p-3 text-white  w-full  rounded-sm "
          />
          <input
            onChange={infoChange}
            required
            value={info?.password}
            name="password"
            type="password"
            placeholder="Password"
            className="bg-[#070F2B] p-3 text-white w-full  rounded-sm "
          />
          <button type="submit" className="bg-[#1B1A55] pt-3 pb-3 rounded-sm">
            Sign Up
          </button>
          <span className="font-light">
            Do you have an account ?
            <Link className="font-extrabold pl-1" href="/login">
              Login
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}
