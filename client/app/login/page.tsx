"use client";
import React, { useState } from "react";
import Logo from "../../public/Logo.png";
import Image from "next/image";
import { handleLoginChange, loginForm } from "../functions";
import { getIsloggedin } from "../functions";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [isLoggedIn, setIsloggedIn] = useState(false);

  const loginAndCheckLogin = async (event: any) => {
    await loginForm(event, loginData);
    const isLogIn = async () => {
      setIsloggedIn(await getIsloggedin());
    };
    isLogIn();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <Image
            src={Logo}
            alt="Logo"
            width={100}
            height={100}
            className="mx-auto rounded"
          />
          <h2 className="text-2xl font-bold mt-4">Welcome Back!</h2>
          <p className="text-gray-600">Login to your account</p>
        </div>
        <form onSubmit={(e) => loginAndCheckLogin(e)} className="space-y-6">
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
              value={loginData.username}
              onChange={(e) => handleLoginChange(e, setLoginData, loginData)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
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
              value={loginData.password}
              onChange={(e) => handleLoginChange(e, setLoginData, loginData)}
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
              Login
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <a href="/register" className="text-blue-500 hover:underline">
            Don't have an account? Sign up
          </a>
        </div>
      </div>
      {isLoggedIn && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold mb-4">Successfully Logged In!</h3>
            <a
              href="/"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Go to Home Page
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
