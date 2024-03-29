import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "./Providers";
import BlogProvider from "@/components/context/BlogContext";

export const metadata: Metadata = {
  title: "Blog app",
  description: "Best Blog App In The World",
};

const font = Nunito({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <AuthProvider>
          <BlogProvider>
            <div className="bg-[#070F2B]">
              <div className=" text-white w-8/12 m-auto  max-w-screen-2xl flex flex-col ">
                <Navbar />
                {children}
                <Footer />
              </div>
            </div>
          </BlogProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
