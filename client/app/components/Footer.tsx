import React from "react";
import Image from "next/image";
import Logo from "../../public/Logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto p-6 text-center">
        <Image
          src={Logo}
          alt="Logo"
          width={100}
          height={100}
          className="mx-auto mb-4"
        />
        <p className="text-lg mb-4">
          © {new Date().getFullYear()} Crumble Styles. All rights reserved.
        </p>
        <div className="flex justify-center gap-4 mb-4">
          <a href="/about" className="hover:underline">
            About Us
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
          <a href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </a>
        </div>
        <div className="flex justify-center gap-4">
          <a href="#" className="text-blue-400 hover:text-blue-500">
            Facebook
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-500">
            Twitter
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-500">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
