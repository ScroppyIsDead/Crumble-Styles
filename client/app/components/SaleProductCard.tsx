"use client";
import { useRouter } from "next/navigation";
import { FaShoppingCart, FaHeart, FaRegHeart, FaCheck } from "react-icons/fa";
import {
  addItemToCart,
  addItemToFavorites,
  removeFromFavorites,
  getIsloggedin,
} from "../functions";
import { useState, useEffect } from "react";

const ProductCard = ({ product, favoriteList = [] }) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showFavoritePrompt, setShowFavoritePrompt] = useState(false);

  useEffect(() => {
    if (Array.isArray(favoriteList) && favoriteList.length > 0) {
      setIsFavorite(favoriteList.some((fav) => fav.id === product.id));
    } else {
      console.error("favoriteList is not an array:", favoriteList);
    }
    const isLogIn = async () => {
      setIsLoggedIn(await getIsloggedin());
    };
    isLogIn();
  }, [favoriteList, product.id]);

  const handleViewProduct = () => {
    router.push(`/products/${product.id}`);
  };

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

  const handleFavoriteClick = async () => {
    if (!isLoggedIn) {
      setShowFavoritePrompt(true);
      return;
    }
    try {
      if (isFavorite) {
        await removeFromFavorites(product.id);
      } else {
        await addItemToFavorites(product.id);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Failed to update favorites:", error);
    }
  };

  const handleCloseLoginPrompt = () => {
    setShowLoginPrompt(false);
    setShowFavoritePrompt(false);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg relative">
      <img
        src={`http://localhost:8000${product.image}`}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <button
        onClick={handleFavoriteClick}
        className={`absolute top-2 right-2 text-2xl ${
          isFavorite ? "text-red-500" : "text-gray-500"
        } hover:text-red-600`}
      >
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
      </button>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{product.title}</h3>
        <p className="text-lg font-semibold mt-4">
          {product.price && (
            <span className="line-through text-red-500 mr-2">
              ${product.price}
            </span>
          )}
          ${product.current_price}
        </p>
        {product.sale_end && (
          <p className="text-sm text-gray-500">
            Sale ends on: {new Date(product.sale_end).toLocaleDateString()}
          </p>
        )}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleViewProduct}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            View
          </button>
          <button
            onClick={handleAddToCart}
            className={`bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center ${
              isAddedToCart ? "bg-green-700" : ""
            }`}
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
      {(showLoginPrompt || showFavoritePrompt) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 mx-2 rounded-lg shadow-lg text-center">
            <p className="text-lg mb-4">
              Please log in to{" "}
              {showFavoritePrompt
                ? "add to favorites"
                : "add items to the cart"}
              .
            </p>
            <button
              onClick={() => router.push("/login")}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded"
            >
              Go to Login
            </button>
            <button
              onClick={handleCloseLoginPrompt}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-2 rounded ml-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
