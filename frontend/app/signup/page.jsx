"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SignInButton from "../login/SignInButton";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
  };

  const inputClasses = "border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none";

  return (
    <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[120px]">
      <div className="container">
        <div className="w-full px-4">
          <div className="[box-shadow:0_0_0.5rem_0_lightgray] mx-auto max-w-[500px] rounded bg-white px-6 py-5 dark:bg-dark sm:p-[30px]">
            <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
              Create your account
            </h3>
            <p className="mb-11 text-center text-base font-medium text-body-color">
              It's totally free and super easy
            </p>

            <form onSubmit={handleSubmit}>
              {["name", "email"].map((field) => (
                <div key={field} className="mb-4">
                  <label className="mb-3 block text-sm text-dark dark:text-white">
                    Your {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={`Enter your ${field}`}
                    className={inputClasses}
                    required
                  />
                </div>
              ))}

              <div className="mb-4 relative">
                <label className="mb-3 block text-sm text-dark dark:text-white">
                  Your Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your Password"
                  className={inputClasses}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-[3rem] hover:text-gray-medium dark:text-gray-300 dark:hover:text-gray-low text-[1.2rem]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>

              <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
                <label className="mb-4 sm:mb-0 flex cursor-pointer select-none items-center text-sm font-medium text-body-color">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="box mr-4 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 peer-checked:bg-primary peer-checked:border-primary dark:border-white dark:border-opacity-10" />
                  Keep me signed in
                </label>
                <Link href="/forget" className="text-sm font-medium text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-orange-orange500 hover:bg-orange-orange600 px-9 py-4 text-base font-medium text-white duration-300 mb-6"
              >
                Sign up
              </button>
            </form>

            <div className="mb-8 flex items-center justify-center">
              <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block" />
              <p className="w-full px-5 text-center text-base font-medium text-body-color">
                Or, sign in with Google
              </p>
              <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block" />
            </div>

            <SignInButton />
            <p className="text-center text-base font-medium text-body-color">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <svg className="absolute left-0 top-0 z-[-1]" width="1440" height="969" viewBox="0 0 1440 969" fill="none">
        <mask id="mask0_95:1005" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="969">
          <rect width="1440" height="969" fill="#090E34" />
        </mask>
        <g mask="url(#mask0_95:1005)">
          <path opacity="0.1" d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z" fill="url(#paint0_linear_95:1005)" />
          <path opacity="0.1" d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z" fill="url(#paint1_linear_95:1005)" />
        </g>
        <defs>
          <linearGradient id="paint0_linear_95:1005" x1="1178.4" y1="151.853" x2="780.959" y2="453.581" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4A6CF7" />
            <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="paint1_linear_95:1005" x1="160.5" y1="220" x2="1099.45" y2="1192.04" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4A6CF7" />
            <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
};

export default SignupPage;