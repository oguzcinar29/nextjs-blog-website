"use client";
import { apiURL } from "@/url";
import { signOut } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";

export type blogContextType = {
  link: string;
  setLink: any;
  posts: any;
  setPosts: any;
  users: any;
  setUsers: any;
};

export const blogContextDefaultValue: blogContextType = {
  link: "",
  setLink: () => {},
  posts: [],
  setPosts: () => {},
  users: [],
  setUsers: () => {},
};

export const BlogContext = createContext<blogContextType>(
  blogContextDefaultValue
);

const BlogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [link, setLink] = useState<string>("hey");
  const [posts, setPosts] = useState<any>([]);

  const getAllPost = async () => {
    try {
      const data = await fetch(`${apiURL}/api/post`, {
        cache: "no-cache",
      });
      data.json().then((data) => setPosts(data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  const [users, setUsers] = useState<any>([]);

  const getAllUsers = async () => {
    try {
      const data = await fetch(`${apiURL}/api/user`, {
        cache: "no-cache",
      });
      data.json().then((data) => setUsers(data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const values: any = {
    link,
    posts,
    setPosts,
    setLink,
    users,
    setUsers,
  };

  return <BlogContext.Provider value={values}>{children}</BlogContext.Provider>;
};
export default BlogProvider;
