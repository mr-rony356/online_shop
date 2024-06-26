import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/app/(userInterface)/components/Header";
import { createUser, getCartQuantity } from "../admin/_actions/products";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Mrrony Store",
  description: "All you need for your life",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cartQuantity = await getCartQuantity('666c8e87a4f6915aa99e7cb5');
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen mx-3 !md:mx-0 md:container xl:px-28 bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <Header cartQuantity={cartQuantity} />
        <main className="my-10">{children}</main>
      </body>
    </html>
  );
}
