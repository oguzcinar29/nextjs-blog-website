"use client";
import React, { createContext, useEffect, useState } from "react";

export type blogContextType = {
  link: string;
  setLink: any;
};

export const blogContextDefaultValue: blogContextType = {
  link: "",
  setLink: () => {},
};

export const BlogContext = createContext<blogContextType>(
  blogContextDefaultValue
);

const BlogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [link, setLink] = useState<string>("hey");

  const values: any = {
    link,
    setLink,
  };

  return <BlogContext.Provider value={values}>{children}</BlogContext.Provider>;
};
export default BlogProvider;
