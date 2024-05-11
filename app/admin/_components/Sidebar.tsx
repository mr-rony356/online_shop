import { FaCircleUser } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import SidebarLinks from "@/app/admin/_components/SideNavLinks";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import Image from "next/image";
const Sidebar = () => {
  return (
    <div className="p-4 w-1/5 border-r border-gray h-screen flex-shrink-0 fixed top-0 flex-1">
      <div className="logo p-2">
        <Image
          src="/logo.png"
          alt="admin logo"width="40" height={"40"}
          style={{ width: "40px", filter: "invert(100%)" }}
        />
      </div>
      <SidebarProfile />
      <SidebarLinks icon={<RxDashboard />} title="Dashboard" href="/admin" />
      <SidebarLinks icon={<FaCircleUser />} title="Users" href="/admin/users" />
      <SidebarLinks
        icon={<MdOutlineProductionQuantityLimits />}
        title="Products"
        href="/admin/products"
      />
            <SidebarLinks icon={<CiLogout />} title="Log out" href="/api/auth/signout" />

    </div>
  );
};
export const SidebarProfile = () => {
  return (
    <div className="bg-gray-200 rounded-md my-4 ">
      <div className="flex gap-6 py-6 px-4 items-center">
        {/* <img
          className="rounded-xl"
          src="/logo.png"
          alt="logo"
          style={{ width: "20px", filter: "invert(100%)" }}
        /> */}
        <FaRegCircleUser size={30} />

        <p>Omor Faruk</p>
      </div>
    </div>
  );
};

export default Sidebar;
