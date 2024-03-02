"use client";

import { BlogContext } from "@/components/context/BlogContext";
import { apiURL } from "@/url";
import { PutBlobResult } from "@vercel/blob";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { FormEventHandler, useContext, useRef, useState } from "react";

export default function Write() {
  const { editId, posts, setEditId } = useContext(BlogContext);
  console.log(editId);

  const findPost = posts.find((item: any) => item._id === editId);
  console.log(findPost);

  const router = useRouter();
  const { data: session } = useSession();

  const [title, setTitle] = useState<string>(
    typeof findPost !== "undefined" ? findPost?.title : ""
  );

  const [text, setText] = useState<string>(
    typeof findPost !== "undefined" ? findPost?.text : ""
  );

  const [image, setImage] = useState<string>(
    typeof findPost !== "undefined" ? findPost?.image : ""
  );
  const [img, setImg] = useState<File>();

  const { setLink } = useContext(BlogContext);

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setImg(event.target.files[0]);
    }
  };

  const shareSubmit = async (e: any) => {
    e.preventDefault();
    const userId = session?.user?.id;
    console.log(userId);
    console.log(title, text, img);

    try {
      const date = new Date().toLocaleString();
      const data = new FormData();
      data.append("title", title);
      data.append("text", text);
      data.append("date", date);
      data.set("postImage", img);
      data.append("userId", userId);

      if (typeof findPost === "undefined") {
        const res = await fetch(`${apiURL}/api/post`, {
          method: "POST",
          body: data,
        });
        if (!res.ok) {
          throw new Error("Failed to send data");
        } else {
          setLink("Blog");
          router.push("/blog");
          router.refresh();
        }
      } else {
        const res = await fetch(`${apiURL}/api/post/${findPost?._id}`, {
          method: "PUT",
          body: data,
        });
        if (!res.ok) {
          throw new Error("Failed to change values");
        } else {
          router.push("/blog");
          router.refresh();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-42 mt-24">
      <form onSubmit={shareSubmit} className="flex gap-10">
        <div className="flex flex-col gap-6 w-4/5">
          <input
            className="bg-[#1B1A55] text-white p-3 "
            type="text"
            placeholder="Title"
            name="title"
            id=""
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
          />
          <textarea
            onChange={(e) => setText(e.target.value)}
            name=""
            className="text-white bg-[#1B1A55] p-3 resize-none "
            id=""
            placeholder="Text"
            cols={30}
            rows={10}
            value={text}
          ></textarea>
        </div>
        <div className="flex flex-col gap-3 ">
          <div className="flex flex-col gap-1 ">
            <input
              type="file"
              name="postImage"
              id="postImage"
              onChange={onImageChange}
            />

            {(image || findPost?.image) && (
              <img
                className="w-full h-60 object-cover"
                src={image}
                alt="image"
              />
            )}
          </div>
          <button type="submit" className="bg-[#9290C3] pt-3 pb-3 font-bold ">
            Share Post
          </button>
        </div>
      </form>
    </div>
  );
}
