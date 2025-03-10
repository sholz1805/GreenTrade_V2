"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="relative flex-1">
        <Image
          src="/cassava.jpg"
          alt="Cassava"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black opacity-80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <Image
            src="/GreenTradeLogoMain.png"
            alt="logo"
            width={64}
            height={64}
            className="mb-2"
          />
          <h1 className="text-lg font-bold">GreenTrade</h1>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-green-50 p-4 md:p-8">
        <form className="bg-white p-6 rounded-lg w-full max-w-sm">
          <h2 className="text-md text-green-900 font-bold mb-6 text-center">
            Register
          </h2>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-xs font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              className="mt-1 block w-full p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:border focus:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:border focus:border-green-500"
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-xs font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              className="mt-1 block w-full p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:border focus:border-green-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 mt-5 flex items-center pr-3"
            >
              {showPassword ? (
                <FaRegEyeSlash className="text-green-900" size={12} />
              ) : (
                <FaRegEye className="text-green-900" size={12} />
              )}
            </button>
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              required
              className="mt-1 block w-full p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:border focus:border-green-500"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 mt-5 flex items-center pr-3"
            >
              {showConfirmPassword ? (
                <FaRegEyeSlash className="text-green-900" size={12} />
              ) : (
                <FaRegEye className="text-green-900" size={12} />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-900 text-white text-xs rounded-md hover:bg-green-700 transition duration-200"
          >
            Register
          </button>
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-600">
              Already have an account? 
              <a href="/auth/signin" className="text-green-600 hover:underline">
                Sign In
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;