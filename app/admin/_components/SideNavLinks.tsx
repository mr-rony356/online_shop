"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type SidebarLinksProps = {
  title: string;
  href: string;
  icon: ReactNode;
};
const SidebarLinks = ({ title, href, icon }: SidebarLinksProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex gap-6 px-4 py-3 my-2 rounded-md items-center ",
        "hover:bg-gray-100 transition duration-300",
        isActive && " bg-slate-200 text-blue-600 "
      )}
    >
      <span className={cn(isActive && "text-blue-500")}>{icon}</span>
      {title}
    </Link>
  );
};
export default SidebarLinks;
