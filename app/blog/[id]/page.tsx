"use client";
import { BlogContext, blogContextType } from "@/components/context/BlogContext";
import { useParams, useRouter } from "next/navigation";

import { useContext, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useSession } from "next-auth/react";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { apiURL } from "@/url";
export default function SingleBlogPost({ params }) {
  const { id } = params;

  const { posts, users } = useContext<blogContextType>(BlogContext);
  const findItem = posts.find((item: any) => item._id === id);
  const findUser = users.find((item: any) => item._id === findItem?.userId);

  const router = useRouter();
  const { data: session } = useSession();

  const deletePost = async () => {
    try {
      const res = await fetch(`${apiURL}/api/post/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete post");
      } else {
        router.push("/blog");
        router.refresh();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="pt-10 pb-20 h-halfmore">
      <div className="flex justify-between gap-10">
        <div className="flex w-1/3 h-full">
          <img
            className="max-w-full max-h-full  object-cover"
            src={findItem?.image}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-10 w-2/3">
          <h1 className="text-5xl font-bold">{findItem?.title}</h1>
          <div className="flex gap-5">
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="Remy Sharp"
                src={findUser?.image}
                sx={{ width: 56, height: 56 }}
              />
            </Stack>
            <div className="flex gap-3 flex-col">
              <span>Author</span>
              <span>{findUser?.name}</span>
            </div>
            <div className="flex gap-3 flex-col">
              <span>Published</span>
              <span>{findItem?.date}</span>
            </div>
            {session?.user?.id === findUser?._id && (
              <div className="flex flex-col gap-3">
                <button onClick={deletePost} className="text-red-500">
                  <DeleteIcon />
                </button>
                <button>
                  <BorderColorIcon />
                </button>
              </div>
            )}
          </div>
          <p>{findItem?.text}</p>
        </div>
      </div>
    </div>
  );
}
