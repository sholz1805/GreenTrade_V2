"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your registered email address."); 
      return;
    }

    // Simulate sending a password reset link
    toast.success("A password reset link has been sent to your email address."); 
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
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-full max-w-sm">
          <h2 className="text-md text-green-900 font-bold mb-6 text-center">
            Forgot Password
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:border focus:border-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-900 text-white text-xs rounded-md hover:bg-green-700 transition duration-200"
          >
            Send Reset Link
          </button>
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-600">
              Remembered your password?{" "}
              <a href="/auth/signin" className="text-green-600 hover:underline">
                Sign In
              </a>
            </p>
          </div>
        </form>
      </div>

      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        closeOnClick 
        pauseOnHover 
        draggable 
        pauseOnFocusLoss 
        theme="light"
      />
    </div>
  );
};

export default ForgotPassword;