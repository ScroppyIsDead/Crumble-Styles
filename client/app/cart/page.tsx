"use client";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import {
  getCart,
  removeItemFullyFromCart,
  removeItemFromCart,
  addItemToCart,
  getIsloggedin,
} from "../functions";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        await getCart(setCartItems);
        setIsLoggedIn(await getIsloggedin());
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };
    getIsloggedin();
    fetchCartItems();
  }, []);

  const handleRemoveItem = async (productId) => {
    try {
      await removeItemFullyFromCart(productId);
      setCartItems(cartItems.filter((item) => item.product.id !== productId));
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const addAndRefresh = async (productid: any) => {
    await addItemToCart(productid);
    getCart(setCartItems);
  };

  const removeAndRefresh = async (productid: any) => {
    await removeItemFromCart(productid);
    getCart(setCartItems);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 gap-8">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center border p-4 rounded-lg shadow-md bg-white"
            >
              <img
                src={`http://localhost:8000${item.product.image}`}
                alt={item.product.title}
                className="w-24 h-24 object-cover mr-4"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.product.title}</h2>
                <p className="text-lg">Price: ${item.product.current_price}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => removeAndRefresh(item.product.id)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-1 px-2 rounded-lg"
                  >
                    -
                  </button>
                  <span className="mx-4 text-lg">{item.quantity}</span>
                  <button
                    onClick={() => addAndRefresh(item.product.id)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-1 px-2 rounded-lg"
                  >
                    +
                  </button>
                </div>
                <p className="text-lg mt-2">
                  Total: $
                  {(item.quantity * item.product.current_price).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => handleRemoveItem(item.product.id)}
                className="text-red-600 hover:text-red-800 ml-4"
              >
                <FaTrashAlt size={24} />
              </button>
            </div>
          ))
        ) : isLoggedIn ? (
          <p>Your cart is empty</p>
        ) : (
          <a href="/login">Sign in to see your cart</a>
        )}
      </div>
      <div className="mt-8">
        <a
          href="/checkout"
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg"
        >
          Proceed to Checkout
        </a>
      </div>
    </div>
  );
};

export default CartPage;
