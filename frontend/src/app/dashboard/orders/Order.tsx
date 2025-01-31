'use client';

import Link from "next/link";
import FilterSidebar from "./ordercomponents/FilterSidebar";
import OrdersList from "./ordercomponents/OrdersList";
import SearchBar from "./ordercomponents/SearchBar";
import { AiFillHome } from "react-icons/ai";
import { useState } from "react";
import { IoFilterOutline } from "react-icons/io5";

export default function Order() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    // Outer container with gray background
    <div className="min-h-screen pt-[8rem] max-w-[88%] mx-auto pb-[4rem]">
      <div className="mb-[1rem] flex gap-[0.5rem] items-center justify-between">

        <div className="flex gap-[0.5rem] items-center">
          <Link href={"/"}>
            <AiFillHome className="text-[1.2rem] hover:opacity-[0.8] mt-[-.3rem] text-gray-medium" />
          </Link>
          <h1 className="text-[1rem] font-bold text-gray-dark">{">"}</h1>
          <Link href={"/dashboard/profilesection"}>
          <p className="text-[1rem] text-orange-orange500 font-semibold opacity-[0.6] hover:opacity-[.8] cursor-pointer">Dashboard</p>
          </Link>
          <h1 className="text-[1rem] font-bold text-gray-dark">{">"}</h1>
          <p className="text-[1rem] text-orange-orange500 font-semibold opacity-[0.6] hover:opacity-[.8] cursor-pointer">My Orders</p>

        </div>
        {/* Filter Text */}
        <button
          className="lg:hidden text-gray-medium font-semibold flex gap-1 items-center box-shadow py-1 px-3 rounded-md hover:bg-gray-light"
          onClick={toggleSidebar}
        >
          <IoFilterOutline /> Filter
        </button>

      </div>

      <div className="flex min-h-screen gap-[1rem] max-lg:gap-[0rem] 3xl:justify-start rounded-lg">
        {/* Sidebar */}
        <FilterSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div className="max-lg:flex-1 3xl:flex-none w-[70%] bg-white rounded-lg">
          {/* <SearchBar /> */}
          <OrdersList />
        </div>
      </div>
    </div>
  );
}