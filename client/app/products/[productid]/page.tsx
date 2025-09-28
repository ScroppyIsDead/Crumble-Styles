"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getproduct, addItemToCart, getIsloggedin } from "@/app/functions";
import { FaCheck, FaShoppingCart } from "react-icons/fa";

const Page = ({ params }) => {
  const router = useRouter();
  const [product, setProduct] = useState({});
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getproduct(params.productid);
      setProduct(fetchedProduct);
    };
    fetchProduct();
    const setIsLogIn = async () => {
      setIsLoggedIn(await getIsloggedin());
    };
    setIsLogIn();
  }, [params.productid]);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    try {
      await addItemToCart(product.id);
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const handleCloseLoginPrompt = () => {
    setShowLoginPrompt(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center items-center">
            <img
              src={`http://localhost:8000${product.image}`}
              alt={product.title}
              className="w-full h-auto max-h-96 object-cover rounded-lg"
            />
          </div>
          <div className="p-4">
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <p className="text-lg mb-4">{product.description}</p>
            <p className="text-2xl font-semibold mb-4">
              Price: ${product.current_price}
              {product.current_price !== Number(product.price) && (
                <span className="line-through text-gray-500 ml-2">
                  ${product.price}
                </span>
              )}
            </p>
            <button
              onClick={handleAddToCart}
              className={
                "bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg flex items-center"
              }
            >
              {isAddedToCart ? (
                <FaCheck className="mr-2" />
              ) : (
                <FaShoppingCart className="mr-2" />
              )}
              {isAddedToCart ? "Added" : "Add to Cart"}
            </button>
          </div>
        </div>
      </section>
      {showLoginPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 mx-2 rounded-lg shadow-lg text-center">
            <p className="text-lg mb-4">
              Please log in to add items to the cart.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Go to Login
            </button>
            <button
              onClick={handleCloseLoginPrompt}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded ml-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
