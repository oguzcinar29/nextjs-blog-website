"use client";
import { BlogContext, blogContextType } from "@/components/context/BlogContext";
import { useParams, useRouter } from "next/navigation";

import { useContext, useEffect, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useSession } from "next-auth/react";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { apiURL } from "@/url";
import Link from "next/link";
import { set } from "mongoose";
export default function SingleBlogPost({ params }) {
  const { id } = params;

  const { users } = useContext<blogContextType>(BlogContext);
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
  const findItem = posts.find((item: any) => item._id === id);
  const findUser = users.find((item: any) => item._id === findItem?.userId);

  const router = useRouter();
  const { data: session } = useSession();
  const { editId, setEditId } = useContext(BlogContext);

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
                <Link
                  onClick={() => {
                    setEditId(id);
                  }}
                  href="/write"
                >
                  <BorderColorIcon />
                </Link>
              </div>
            )}
          </div>
          <p>{findItem?.text}</p>
        </div>
      </div>
    </div>
  );
}
