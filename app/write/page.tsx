"use client";

import { useState } from "react";

export default function Write() {
  const [title, setTitle] = useState<string>("");

  const [text, setText] = useState<string>("");

  return (
    <div className="mb-32 mt-16">
      <div className="flex">
        <div className="flex flex-col gap-6 w-2/3">
          <input
            className="bg-[#1B1A55] text-white p-3"
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
            className="text-white bg-[#1B1A55] p-3 resize-none"
            id=""
            placeholder="Text"
            cols={30}
            rows={10}
            value={text}
          ></textarea>
        </div>
        <div className="flex flex-col gap-6">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
