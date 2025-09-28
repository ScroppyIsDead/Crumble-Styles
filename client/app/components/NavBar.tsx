"use client";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { getCart, getCartCount, getIsloggedin } from "../functions";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchCartCount = async () => {
      const count = await getCartCount();
      setCartItemCount(count);
      console.log(count);
    };
    const getloggedin = async () => {
      setisLoggedIn(await getIsloggedin());
    };
    getloggedin();
    fetchCartCount();
  }, []);

  return (
    <div className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="text-2xl font-bold text-gray-900">
                Crumble Styles
              </a>
            </div>
            <div className="hidden md:flex space-x-4 ml-10">
              <a
                href="/"
                className="text-gray-900 self-center hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </a>
              <a
                href="/products"
                className="text-gray-900 self-center hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Products
              </a>
              <a
                href="/cart"
                className="text-gray-900 self-center hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Cart
              </a>
              <a
                href="/about"
                className="text-gray-900 self-center hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                About Us
              </a>
              <a
                href="/contact"
                className="text-gray-900 self-center hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <a href="/cart" className="text-gray-900 hover:text-gray-700">
                <FaShoppingCart className="h-6 w-6" />
              </a>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-1 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </div>
            {isLoggedIn ? (
              <a href="/account" className="text-gray-900 hover:text-gray-700">
                <FaUser className="h-6 w-6" />
              </a>
            ) : (
              <a className="font-bold " href="/login">
                Login here
              </a>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-900 hover:text-gray-700 focus:outline-none focus:text-gray-700"
            >
              {isOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="/"
              className="block text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </a>
            <a
              href="/products"
              className="block text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Products
            </a>
            <a
              href="/cart"
              className="block text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Cart
            </a>
            <a
              href="/about"
              className="block text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-base font-medium"
            >
              About Us
            </a>
            <a
              href="/contact"
              className="block text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Contact Us
            </a>
            <a
              href="/account"
              className="block text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Account
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
