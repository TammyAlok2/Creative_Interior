"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaBoxOpen,
  FaUserAlt,
  FaGift,
  FaTimes,
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import DashboardSection from "./dashboardcomponents/DashboardSection";
import { IoIosArrowForward } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const { user, fetchUserDetails, isLoggedIn } = useAuthStore()
  // console.log("userdata: ", user.name)
  const { logout } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    fetchUserDetails()
  }, [])

  const LogOut = async () => {
    // const notify = () => toast('This is a basic alert!');
    // console.log("logout")
    await logout();

    setTimeout(() => {
      router.push("/");
    }, 2000); // Redirect after 2 seconds

  };

  return (
    <div className="relative h-full">
      {/* Responsive Dashboard Toggle */}
      <div className="lg:hidden py-2 px-4 flex justify-between items-center rounded-lg bg-gray-light mb-5">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <button onClick={() => setIsDashboardOpen(!isDashboardOpen)}>
          {isDashboardOpen ? <FaTimes size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Dashboard Content */}
      <div>
        <div
          className={`md:relative h-full max-lg:w-[100%] w-[22rem] border box-shadow rounded-xl p-[1.2rem] lg:block ${isDashboardOpen ? "block" : "hidden"
            }`}
        >
          {/* Profile Section */}
          <div className="mb-6 flex px-4 py-2 items-center border rounded-xl">
            {isLoggedIn && user ? (
              <>
                <div
                  className="w-16 h-16 items-center justify-center rounded-full mr-3 cursor-pointer"
                >
                  {/* <Image
                    src={user?.photo }
                    alt={"profile-image"}
                    width={64}
                    height={64}
                    className="object-cover hover:scale-[1.2] transition-all duration-500 ease-in-out hover:opacity-[0.8]"
                  /> */}
                  <FaUserCircle className="text-[4rem] opacity-[.7] text-center" />
                </div>
                <h2 className="text-lg font-semibold">
                  Hello, {user?.name as string || "User"}  
                </h2>
              </>
            ) : (<h1 className="font-bold text-gray-medium">Loading...</h1>)}
          </div>

          {/* Dashboard Sections */}
          <div className="p-4 border rounded-xl">
            <DashboardSection
              title={
                <Link
                  href="/dashboard/orders" // Orders page route
                  className="flex items-center gap-2 hover:text-blue-dark transition-all duration-500 ease-in-out"
                >
                  <FaBoxOpen className="mr-2" /> My Orders <IoIosArrowForward />
                </Link>
              }
              items={[]}
            />

            <DashboardSection
              title={<><FaUserAlt className="mr-2" /> Account Settings</>}
              items={[
                { label: "Profile Information", href: "/dashboard/profilesection" },
                { label: "Manage Addresses", href: "/dashboard/addresses" },
              ]}
            />

            <DashboardSection
              title={<><FaGift className="mr-2" /> My Stuff</>}
              items={[
                { label: "My Coupons", href: "/dashboard/my-coupons" },
                { label: "My Reviews & Ratings", href: "/dashboard/reviews" },
                // { label: "All Notifications", href: "/dashboard/notifications" },
                { label: "My Wishlist", href: "/dashboard/wishlist" },
              ]}
            />

            <div className="mt-6">
              <button className="w-full text-left text-red-500 font-semibold flex gap-[.5rem] ml-3 items-center hover:text-orange-orange500 transition-all duration-500 ease-in-out" onClick={()=>LogOut()}><TbLogout2 className="text-xl" /> Logout</button>
            </div>

            {/* <div className="mt-4">
              <div className="text-gray-400">Frequently Visited:</div>
              <div className="text-blue-500 cursor-pointer">Track Order</div>
              <div className="text-blue-500 cursor-pointer">Help Center</div>
            </div> */}
          </div>

        </div>
      </div>
    </div>
  );
}
