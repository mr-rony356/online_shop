import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/app/(userInterface)/components/Header";
import db from "@/db/db";
import { Prisma } from '@prisma/client';
import { getCartQuanity } from "@/lib/product";

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
  // Use Prisma's types to define the cart variable
  const cartQuantity = await getCartQuanity('1');
    return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen mx-3 !md:mx-0 md:container xl:px-28 bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <Header cartQuantity={cartQuantity} />
                <main className="my-10" >{children}</main>
      </body>
    </html>
  );
}
