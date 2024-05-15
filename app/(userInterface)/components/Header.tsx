"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiShoppingCart, FiHeart, FiUser, FiSearch } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import Logo from "../../../components/ui/Logo";
import { Button } from "../../../components/ui/button";
import { FaClipboardList, FaCog } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

const Header: React.FC = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowProfileDropdown(false);
    }
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setShowSearch(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex bg-transparent justify-between items-center py-4 sticky top-0 z-10 backdrop-blur-sm bg-opacity-75 backdrop-filter">
      <Logo />

      <div className="flex justify-center items-center md:w-1/2 w-full relative">
        <div className="md:hidden absolute left-3/4 top-1/2 -translate-y-1/2">
          <FiSearch className="text-xl text-gray-500" onClick={toggleSearch} />
        </div>
      </div>
      <div ref={searchRef} className={`md:block ${showSearch ? 'block' : 'hidden'} animate-search backdrop-blur-3xl backdrop-filter animate-duration absolute md:static top-0 left-0 !w-full py-4 h-full z-50 bg-white bg-opacity-75`}>
        <Input
          placeholder="Search..."
          className="!w-full search h-full pl-8 border-none outline-none focus:outline-none bg-transparent active:outline-none focus-within:outline-none backdrop-blur-3xl  backdrop-filter"
        />
        <FiSearch className="text-lg ml-2 text-gray-800 absolute left-0 top-1/2 -translate-y-1/2 backdrop-blur-sm bg-opacity-75 backdrop-filter " />

          <Button onClick={toggleSearch} className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 backdrop-blur-sm bg-opacity-75 backdrop-filter">
            Search
          </Button>
        </div>

      <div className="flex items-center space-x-4">
        <Link href="#" className="text-gray-500">
          <FiHeart className="text-2xl" />
        </Link>
        <Link href="#" className="text-gray-500">
          <FiShoppingCart className="text-2xl" />
        </Link>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleProfileDropdown}
            className="text-gray-500 focus:outline-none"
          >
            <FiUser
              className={`text-2xl ${
                showProfileDropdown ? "text-black l " : ""
              }`}
            />
          </button>
          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 transition-all duration-300 ease-in-out transform origin-top-right animate-dropdown">
              <div className="py-1">
                <Link
                  href="#"
                  className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
                >
                  <FaClipboardList className="mr-2" />
                  Orders
                </Link>
                <Link
                  href="#"
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
                >
                  <FiUser className="mr-2" />
                  Profile
                </Link>
                <Link
                  href="#"
                  className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
                >
                  <FaCog className="mr-2" />
                  Settings
                </Link>
                <Link
                  href="#"
                  className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
                >
                  <CiLogout className="mr-2" />
                  Log out
                </Link>
              </div>
            </div>
          )}
        </div>
        {/* <Link href="/admin" className="text-gray-500">
          <Button className="w-full"> Admin</Button>
        </Link> */}
      </div>
    </header>
  );
};

export default Header;
