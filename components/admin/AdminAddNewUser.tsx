import { apiURL } from "@/url";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { BlogContext } from "../context/BlogContext";
import { useRouter } from "next/navigation";

export default function AdminAddNewPost() {
  const [name, setName] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");
  const { setLink } = useContext(BlogContext);

  const router = useRouter();

  const [img, setImg] = useState<File>();
  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImg(event.target.files[0]);
    }
  };

  const [err, setErr] = useState<string>("");
  const adminAddUser = async (e: any) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", name);
      data.append("email", email);
      data.append("password", password);
      data.set("file", img);
      const res = await fetch(`${apiURL}/api/register`, {
        method: "POST",
        body: data,
      });
      if (!res.ok) {
        res.json().then((message) => setErr(message.message));
      } else {
        setLink("Blog");
        router.push("/blog");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" w-full">
      <form onSubmit={adminAddUser} className="flex flex-col gap-5">
        <h2>Add New User</h2>
        <input
          className="bg-[#535C91] p-2"
          placeholder="Username"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="bg-[#535C91] p-2"
          placeholder="Title"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="bg-[#535C91] p-2"
          placeholder="Title"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="file" name="file" onChange={onImageChange} />
        <button type="submit" className="bg-[#1B1A55] pt-3 pb-3">
          Add
        </button>
      </form>
    </div>
  );
}
