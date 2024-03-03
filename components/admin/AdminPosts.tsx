import React from "react";
import { PostType } from "../posts/Posts";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { apiURL } from "@/url";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import next from "next";

export default function AdminPosts(props: PostType) {
  const router = useRouter();
  const deletePost = async () => {
    try {
      const res = await fetch(`${apiURL}/api/post/${props._id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete post");
      } else {
        router.refresh();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Stack direction="row" spacing={2}>
          <Avatar alt="" src={props.image} />
        </Stack>
        <span>{props.title}</span>
      </div>
      <button onClick={deletePost} className="bg-red-800 p-1 rounded-sm">
        Delete
      </button>
    </div>
  );
}
