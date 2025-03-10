"use client"
import Image from "next/image";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false); 

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="relative flex-1">
        <Image
          src="/wheat.jpg"
          alt="Wheat"
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
            Sign In
          </h2>
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
              className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:border focus:border-green-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 mt-5 flex items-center pr-3" 
            >
              {showPassword ? (
                <FaRegEyeSlash className="text-green-900 outline:none" size={12} /> 
              ) : (
                <FaRegEye className="text-green-900 outline:none" size={12} /> 
              )}
            </button>
          </div>
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="h-3 w-3 text-green-600 focus:ring-green-900 border-gray-300 rounded accent-green-900"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-xs text-gray-900"
              >
                Remember Me
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-900 text-white text-xs rounded-md hover:bg-green-700 transition duration-200"
          >
            Sign In
          </button>
          <div className="mt-4 text-center">
            <a
              href="/auth/forgot-password"
              className="text-xs text-green-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
          <div className="mt-2 text-center">
            <p className="text-xs text-gray-600">
              Dont have an account?{" "}
              <a href="/auth/register" className="text-green-600 hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;