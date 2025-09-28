"use client";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import Image from "next/image";
import Logo from "../../public/Logo.png";

const AboutPage = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="text-center mb-8">
        <Image
          src={Logo}
          alt="Logo"
          width={100}
          height={100}
          className="mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold mb-4">About This Website</h1>
        <p className="text-lg mb-6">
          Welcome to Crumble Styles! This website is a dummy e-commerce platform
          created for the sole purpose of showcasing web development skills. It
          features various functionalities and design elements that demonstrate
          a strong understanding of full-stack development.
        </p>
        <p className="text-lg mb-6">
          As a web developer, I created this site to highlight my expertise in
          building modern, responsive web applications using technologies such
          as Next.js, Django, and Tailwind CSS. From user authentication to cart
          management and product listings, this site incorporates a range of
          features to provide a realistic e-commerce experience.
        </p>
        <p className="text-lg mb-6">
          Please feel free to explore the site and check out the various
          sections. If you have any questions or feedback, don’t hesitate to
          reach out.
        </p>
        <button
          onClick={handleBackToHome}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center mx-auto"
        >
          <FaHome className="mr-2" /> Back to Home
        </button>
      </div>
    </div>
  );
};

export default AboutPage;
