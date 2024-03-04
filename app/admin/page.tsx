"use client";
import AdminAddNewPost from "@/components/admin/AdminAddNewPost";
import AdminAddNewUser from "@/components/admin/AdminAddNewUser";
import AdminPosts from "@/components/admin/AdminPosts";
import AdminUsers from "@/components/admin/AdminUsers";
import { BlogContext } from "@/components/context/BlogContext";
import { apiURL } from "@/url";
import { useContext, useEffect, useState } from "react";

export default function Admin() {
  const [posts, setPosts] = useState<any>([]);

  const getAllPost = async () => {
    try {
      const data = await fetch(`${apiURL}/api/post`, {
        cache: "no-cache",
      });
      if (!data.ok) {
        throw new Error("Failed to fetch posts");
      } else {
        const postData = await data.json();
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
        setUsers(userData.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(posts);
  console.log(users);

  useEffect(() => {
    getAllUsers();
    getAllPost();

    console.log("use efect");
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-20 pt-10 pb-16">
        <div className="flex justify-between gap-20">
          <div className="flex flex-col gap-3 w-1/2">
            <h3>Posts</h3>
            {posts?.map((item: any, i: number) => {
              return <AdminPosts key={i} {...item} />;
            })}
          </div>
          <div className="flex w-1/2">
            <AdminAddNewPost />
          </div>
        </div>
        <div className="w-11/12 bg-red-500 m-auto">
          <hr className="" />
        </div>

        <div className="flex justify-between gap-20">
          <div className="flex flex-col gap-3 w-1/2">
            <h3>Users</h3>
            {users?.map((item: any, i: number) => {
              return <AdminUsers key={i} {...item} />;
            })}
          </div>
          <div className="flex w-1/2">
            <AdminAddNewUser />
          </div>
        </div>
      </div>
    </div>
  );
}
