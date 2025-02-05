"use client";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import { useState } from "react";
import {Toaster, toast} from 'react-hot-toast'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const {forgotPassword} = useAuthStore()

  const handleForgotPassword = async (e: any) => {
    e.preventDefault();

    try {
      // Simulating a successful submission. Replace with actual API call.
    const response = await forgotPassword(email);
    if(response?.data?.success){
      toast.success(response.data.message || 'Password reset email sent successfully');
        setEmail(" ");
    }
    
    } catch (error) {
      // console.error(error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <>
    <Toaster />
    <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[120px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="[box-shadow:0_0_0.5rem_0_lightgray] mx-auto max-w-[500px] rounded bg-white px-6 py-5 dark:bg-dark sm:p-[30px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Forgot Password
              </h3>
              <p className="mb-11 text-center text-base font-medium text-body-color">
                Enter your email address to receive a password reset link.
              </p>

              <form onSubmit={handleForgotPassword}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email"
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-orange-orange500 dark:border-transparent dark:bg-[#2C303B] dark:focus:border-orange-orange500 dark:focus:shadow-none"
                    required
                  />
                </div>

                <div className="mb-6">
                  <button
                    type="submit"
                    className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-orange-orange500 px-9 py-4 text-base font-medium text-white duration-300 hover:opacity-[0.9]"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>

              <p className="text-center text-base font-medium text-body-color">
                Remember your password?{" "}
                <Link href="/signin" className="text-orange-orange500 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-0 z-[-1]">
        <svg
          width="1440"
          height="969"
          viewBox="0 0 1440 969"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_95:1005"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1440"
            height="969"
          >
            <rect width="1440" height="969" fill="#090E34" />
          </mask>
          <g mask="url(#mask0_95:1005)">
            <path
              opacity="0.1"
              d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
              fill="url(#paint0_linear_95:1005)"
            />
            <path
              opacity="0.1"
              d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
              fill="url(#paint1_linear_95:1005)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_95:1005"
              x1="1178.4"
              y1="151.853"
              x2="780.959"
              y2="453.581"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_95:1005"
              x1="160.5"
              y1="220"
              x2="1099.45"
              y2="1192.04"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
    </>
  );
};

export default ForgotPasswordPage;
