"use client";

import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Toaster, toast } from 'react-hot-toast';
//

export const Profile = () => {
  const { logout } = useAuthStore();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const LogOut = async () => {
    // const notify = () => toast('This is a basic alert!');
    await logout();

    // Clear the cookie by setting its expiration date to a past date
    document.cookie = "token=; path=/; max-age=0; samesite=none; httponly";



    // toast.success('User Logout successful. See you again soon!');
    setTimeout(() => {
      router.push("/");
    }, 2000); // Redirect after 2 seconds

  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <Toaster />
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <div className="relative left-2 transition-all duration-500 ease-in-out" ref={dropdownRef}>
        {/* Profile Icon */}
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full"
        >
          <FaUserCircle className="text-[2rem] opacity-[.7] text-center" />
        </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`absolute right-0 mt-2 w-48 bg-white border rounded-lg box-shadow transition-transform duration-500 ease-in-out ${
          isOpen
            ? "scale-100 translate-y-2 opacity-100"
            : "scale-95 -translate-y-5 opacity-0 pointer-events-none"
        }`}>
          <ul className="py-1">
            <li>
              <a
                href="/dashboard/profilesection"
                className="block px-4 py-2 text-gray-medium hover:bg-gray-low"
              >
                Profile
              </a>
            </li>
              <li>
              <a
                href="/dashboard/orders"
                className="block px-4 py-2 text-gray-medium hover:bg-gray-low"
              >
               Your Orders
              </a>
            </li>
            <li>
              <a
                href="/dashboard/addresses?page=address-section"
                className="block px-4 py-2 text-gray-medium hover:bg-gray-low"
              >
                Saved Address
              </a>
            </li>
            <li>
            <button
        onClick={() => LogOut()}
        className="block px-4 w-full text-left py-2 text-gray-medium hover:bg-gray-low"
      >
        Logout
      </button>
            </li>
          </ul>
        </div>
      )}
    </div>
    </>
  );
};

export default Profile;
