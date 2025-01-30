'use client';

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { fetchUserDetails } = useAuthStore();

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </>
  );
}