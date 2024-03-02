"use client";
import { BlogContext, blogContextType } from "@/components/context/BlogContext";
import Posts from "@/components/posts/Posts";
import { apiURL } from "@/url";
import React, { useContext, useEffect, useState } from "react";

export default function Blog() {
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
        console.log(postData);

        setPosts(postData.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <div className=" w-full max-h-full pt-10 pb-10">
      <div className="flex gap-20 flex-wrap  justify-between">
        {posts?.map((item: any, i: number) => {
          return <Posts key={i} {...item} />;
        })}
      </div>
    </div>
  );
}
