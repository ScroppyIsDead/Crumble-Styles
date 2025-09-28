import React from "react";

const page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>
        <p className="text-gray-600 text-center mb-6">
          If you have any questions or need assistance, feel free to reach out
          to us at the email address below:
        </p>
        <div className="text-center">
          <a
            href="mailto:scroppyisdead@gmail.com"
            className="text-blue-500 hover:underline text-lg font-medium"
          >
            scroppyisdead@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default page;
