"use client";
import { apiURL } from "@/url";
import { authOptions } from "@/utils/authOption";
import { getSession, signOut } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";

export type blogContextType = {
  link: string;
  setLink: any;
  posts: any;
  setPosts: any;
  users: any;
  setUsers: any;
  editId: string;
  setEditId: any;
};

export const blogContextDefaultValue: blogContextType = {
  link: "",
  setLink: () => {},
  posts: [],
  setPosts: () => {},
  users: [],
  setUsers: () => {},
  editId: "",
  setEditId: () => {},
};

export const BlogContext = createContext<blogContextType>(
  blogContextDefaultValue
);

const BlogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [link, setLink] = useState<string>("hey");
  const [posts, setPosts] = useState<any>([]);

  const [editId, setEditId] = useState<string>("");

  const getAllPost = async () => {
    try {
      const data = await fetch(`${apiURL}/api/post`, {
        cache: "no-cache",
      });
      if (!data.ok) {
        throw new Error("Failed to fetch posts");
      } else {
        const postData = await data.json();
        console.log(postData);

        setPosts(postData.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [users, setUsers] = useState<any>([]);

  const getAllUsers = async () => {
    try {
      const data = await fetch(`${apiURL}/api/user`, {
        cache: "no-cache",
      });
      if (!data.ok) {
        throw new Error("Failed to fetch posts");
      } else {
        const userData = await data.json();
        console.log(userData);

        setUsers(userData.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllPost();
    getAllUsers();
  }, []);

  const values: any = {
    link,
    posts,
    setPosts,
    setLink,
    users,
    editId,
    setEditId,
    setUsers,
  };

  return <BlogContext.Provider value={values}>{children}</BlogContext.Provider>;
};
export default BlogProvider;
