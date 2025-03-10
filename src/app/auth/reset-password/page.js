"use client";
import Image from "next/image";
import React, { useState } from "react";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); 
    setMessage(""); 

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setMessage("Your password has been reset successfully.");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="relative flex-1">
        <Image
          src="/cocoa.jpg"
          alt="Cocoa"
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
            Reset Password
          </h2>
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          {message && <p className="text-green-500 text-sm text-center mb-4">{message}</p>}
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-xs font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:border focus:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:border focus:border-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-900 text-white text-xs rounded-md hover:bg-green-700 transition duration-200"
          >
            Reset Password
          </button>
          <div className="mt-4 text-center">
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;