"use client";

import { BlogContext } from "@/components/context/BlogContext";
import { apiURL } from "@/url";
import { PutBlobResult } from "@vercel/blob";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import {
  FormEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export default function Write() {
  const { editId, setEditId } = useContext(BlogContext);

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
    <div className="h-write mt-24  400:h-full">
      <form
        onSubmit={shareSubmit}
        className="flex gap-10  1000:flex-col 1000:justify-center 1000:items-center"
      >
        <div className="flex flex-col gap-6 w-4/5 700:w-screen 700:pr-3 700:pl-3">
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
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 ">
            <input
              type="file"
              name="postImage"
              id="postImage"
              onChange={onImageChange}
            />

            {(image || findPost?.image) && (
              <img
                className="w-full h-60 object-cover "
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
