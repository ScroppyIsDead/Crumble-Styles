"use client";
import React, { useState } from "react";
import Logo from "../../public/Logo.png";
import Image from "next/image";
import { handleRegisterChange, registerForm } from "../functions";

const RegisterPage = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isregisterok, setIsRegisterOk] = useState(0);
  const handleRegister = async (e: any) => {
    e.preventDefault();
    await registerForm(e, registerData, setIsRegisterOk);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 mt-4 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <Image
            src={Logo}
            alt="Logo"
            width={100}
            height={100}
            className="mx-auto rounded"
          />
          <h2 className="text-2xl font-bold mt-4">Create Your Account</h2>
          <p className="text-gray-600">Register to get started</p>
        </div>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={registerData.username}
              onChange={(e) =>
                handleRegisterChange(e, setRegisterData, registerData)
              }
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={registerData.email}
              onChange={(e) =>
                handleRegisterChange(e, setRegisterData, registerData)
              }
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={registerData.password}
              onChange={(e) =>
                handleRegisterChange(e, setRegisterData, registerData)
              }
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <a href="/login" className="text-blue-500 hover:underline">
            Already have an account? Login
          </a>
        </div>
      </div>
      {isregisterok === 1 && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-md">
          <p className="font-bold">Registration Successful!</p>
          <a
            href="/login"
            className="text-blue-200 hover:underline mt-2 inline-block"
          >
            Go to Login Page
          </a>
        </div>
      )}
      {isregisterok === 2 && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-md">
          <p className="font-bold">Registration Not Successful</p>
          <a
            href="/register"
            className="text-blue-200 hover:underline mt-2 inline-block"
          >
            Try Again
          </a>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
