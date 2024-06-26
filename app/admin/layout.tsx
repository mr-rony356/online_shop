import { cn } from "@/lib/utils";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "./_components/Sidebar";
import AuthProvider from "./context/Authprovider";
export const dynamic = "force-dynamic";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "E-Commrce Store Admin",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          inter.variable
        )}
      >
        <AuthProvider>
          <main className="flex">
            <Sidebar></Sidebar>
            <div
              className={cn(
                "font-sans antialiased  ml-[20%] flex-1 px-8  mt-20",
                inter.variable
              )}
            >
              {children}
            </div>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
