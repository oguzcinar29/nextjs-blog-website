"use client";
import { BlogContext, blogContextType } from "@/components/context/BlogContext";
import Posts from "@/components/posts/Posts";
import React, { useContext } from "react";

export default function page() {
  const { posts } = useContext<blogContextType>(BlogContext);

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
