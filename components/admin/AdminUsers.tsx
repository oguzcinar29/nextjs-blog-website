import React from "react";
import { PostType } from "../posts/Posts";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { apiURL } from "@/url";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import next from "next";
export default function AdminUsers(props: {
  name: string;
  image: string;
  _id: string;
}) {
  const router = useRouter();
  const deletePost = async () => {
    console.log("clicked delete");

    try {
      const res = await fetch(`${apiURL}/api/user/${props._id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete post");
      } else {
        console.log("refresh here");
        console.log(res.status);

        router.refresh();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {props.name !== "admin" && (
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <Stack direction="row" spacing={2}>
              <Avatar alt="" src={props.image} />
            </Stack>
            <span>{props.name}</span>
          </div>
          <button onClick={deletePost} className="bg-red-800 p-1 rounded-sm">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
