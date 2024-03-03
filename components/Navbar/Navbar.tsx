"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { BlogContext, blogContextType } from "../context/BlogContext";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MenuIcon from "@mui/icons-material/Menu";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 370,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
// add admin link to manage everything from there

export default function Navbar() {
  const { link, setLink, setEditId } = useContext<blogContextType>(BlogContext);

  const router = useRouter();

  const changeHover = (e: any) => {
    const link = e.target.textContent;
    setEditId("");
    if (link === "Oguz") {
      setLink("Homepage");
    } else {
      setLink(link);
    }
    setOpen(false);
  };

  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <nav>
      <div className="flex justify-between pt-7 pb-7 items-center">
        <Link href="/">
          <h1 onClick={changeHover} className="text-3xl font-bold">
            Oguz
          </h1>
        </Link>
        <div className="flex gap-1 1000:hidden">
          <Link
            className={
              link === "Homepage"
                ? "bg-white rounded-3xl p-3 pr-7 pl-7 text-black"
                : "text-white p-3 pr-7 pl-7"
            }
            onClick={changeHover}
            href="/"
          >
            Homepage
          </Link>
          <Link
            className={
              link === "About"
                ? "bg-white rounded-3xl p-3 pr-7 pl-7 text-black"
                : "text-white p-3 pr-7 pl-7"
            }
            onClick={changeHover}
            href="/about"
          >
            About
          </Link>
          <Link
            className={
              link === "Contact"
                ? "bg-white rounded-3xl p-3 pr-7 pl-7 text-black"
                : "text-white p-3 pr-7 pl-7"
            }
            onClick={changeHover}
            href="/contact"
          >
            Contact
          </Link>
          <Link
            className={
              link === "Blog"
                ? "bg-white rounded-3xl p-3 pr-7 pl-7 text-black"
                : "text-white p-3 pr-7 pl-7"
            }
            onClick={changeHover}
            href="/blog"
          >
            Blog
          </Link>
          {session?.user?.email === "admin@admin.com" && (
            <Link
              className={
                link === "Admin"
                  ? "bg-white rounded-3xl p-3 pr-7 pl-7 text-black"
                  : "text-white p-3 pr-7 pl-7"
              }
              onClick={changeHover}
              href="/admin"
            >
              Admin
            </Link>
          )}
          {typeof session?.user?.email !== "undefined" && (
            <Link
              className={
                link === "Write"
                  ? "bg-white rounded-3xl p-3 pr-7 pl-7 text-black"
                  : "text-white p-3 pr-7 pl-7"
              }
              onClick={changeHover}
              href="/write"
            >
              Write
            </Link>
          )}
          {typeof session?.user?.email === "undefined" && (
            <Link
              className={
                link === "Login"
                  ? "bg-white rounded-3xl p-3 pr-7 pl-7 text-black"
                  : "text-white p-3 pr-7 pl-7"
              }
              onClick={changeHover}
              href="/login"
            >
              Login
            </Link>
          )}
          {typeof session?.user?.email !== "undefined" && (
            <button
              onClick={() => {
                setLink("Login");
                signOut();
              }}
            >
              Logout
            </button>
          )}
        </div>
        <div className="1000-min:hidden 1000:block ">
          <div>
            <Button className="text-white" onClick={handleOpen}>
              <MenuIcon />
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className="flex flex-col justify-between items-center text-black">
                  <Link
                    className={
                      link === "Homepage"
                        ? "bg-white rounded-3xl p-3 pr-7 pl-7 text-black"
                        : " p-3 pr-7 pl-7 text-black"
                    }
                    onClick={changeHover}
                    href="/"
                  >
                    Homepage
                  </Link>
                  <Link
                    className={
                      link === "About"
                        ? "bg-white rounded-3xl p-3 pr-7 pl-7 text-black"
                        : "text-black p-3 pr-7 pl-7"
                    }
                    onClick={changeHover}
                    href="/about"
                  >
                    About
                  </Link>
                  <Link
                    className={
                      link === "Contact"
                        ? "bg-white rounded-3xl p-3 pr-7 pl-7 text-black"
                        : "text-black p-3 pr-7 pl-7"
                    }
                    onClick={changeHover}
                    href="/contact"
                  >
                    Contact
                  </Link>
                  <Link
                    className={
                      link === "Blog"
                        ? "bg-white rounded-3xl p-3 pr-7 pl-7 text-black"
                        : "text-black p-3 pr-7 pl-7"
                    }
                    onClick={changeHover}
                    href="/blog"
                  >
                    Blog
                  </Link>
                  {session?.user?.email === "admin@admin.com" && (
                    <Link
                      className={
                        link === "Admin"
                          ? "bg-white rounded-3xl p-3 pr-7 pl-7 text-black"
                          : "text-black p-3 pr-7 pl-7"
                      }
                      onClick={changeHover}
                      href="/admin"
                    >
                      Admin
                    </Link>
                  )}
                  {typeof session?.user?.email !== "undefined" && (
                    <Link
                      className={
                        link === "Write"
                          ? "bg-white rounded-3xl p-3 pr-7 pl-7 text-black"
                          : "text-black p-3 pr-7 pl-7"
                      }
                      onClick={changeHover}
                      href="/write"
                    >
                      Write
                    </Link>
                  )}
                  {typeof session?.user?.email === "undefined" && (
                    <Link
                      className={
                        link === "Login"
                          ? "bg-white rounded-3xl p-3 pr-7 pl-7 text-black"
                          : "text-black p-3 pr-7 pl-7"
                      }
                      onClick={changeHover}
                      href="/login"
                    >
                      Login
                    </Link>
                  )}
                  {typeof session?.user?.email !== "undefined" && (
                    <button
                      onClick={() => {
                        setLink("Login");
                        signOut();
                      }}
                    >
                      Logout
                    </button>
                  )}
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </nav>
  );
}
