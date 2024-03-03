import { apiURL } from "@/url";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { BlogContext } from "../context/BlogContext";
import { useRouter } from "next/navigation";

export default function AdminAddNewPost() {
  const [title, setTitle] = useState<string | null>("");
  const [text, setText] = useState<string | null>("");

  const { setLink } = useContext(BlogContext);

  const { data: session } = useSession();
  const router = useRouter();

  const [img, setImg] = useState<File>();
  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImg(event.target.files[0]);
    }
  };

  const adminAddPost = async (e: any) => {
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" w-full">
      <form onSubmit={adminAddPost} className="flex flex-col gap-5">
        <h2>Add New Post</h2>
        <input
          className="bg-[#535C91] p-2"
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="bg-[#535C91] p-2 resize-none"
          placeholder="Text"
          value={text}
          cols={30}
          rows={5}
          onChange={(e) => setText(e.target.value)}
        />
        <input type="file" name="adminImage" onChange={onImageChange} />
        <button type="submit" className="bg-[#1B1A55] pt-3 pb-3">
          Add
        </button>
      </form>
    </div>
  );
}
