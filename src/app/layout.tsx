import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkUp",
  description: "Social media app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="w-full bg-white px-2 md:px-4 lg:px-8 xl:px-16 2xl:px-32">
            <Navbar />
          </div>
          <div className="w-full bg-slate-100 px-2 md:px-4 lg:px-8 xl:px-16 2xl:px-32">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
