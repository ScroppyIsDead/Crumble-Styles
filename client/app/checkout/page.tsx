"use client";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import {
  getCart,
  removeItemFromCart,
  addItemToCart,
  create_order,
} from "../functions";
import { stripeKey } from "../KEYS/page";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(stripeKey);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getCart(setCartItems);
  }, []);

  const calculateTotal = () => {
    let total = cartItems.reduce((acc, item) => {
      return acc + item.product.current_price * item.quantity;
    }, 0);

    return total.toFixed(2);
  };

  const removeAndRefresh = async (productid: any) => {
    await removeItemFromCart(productid);
    getCart(setCartItems);
  };

  const addAndRefresh = async (productid: any) => {
    await addItemToCart(productid);
    getCart(setCartItems);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8000/shop/createpaymentintent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const data = await response.json();
      const clientSecret = data.client_secret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          const order = await create_order({
            paymentid: result.paymentIntent.id,
          });
          alert("Payment succeeded!");
          router.push(`orders/${order}`);
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2"></h2>
        {cartItems && cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="border rounded p-4 mb-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="flex items-center mb-4 md:mb-0">
                    <img
                      src={`http://localhost:8000${item.product.image}`}
                      alt={item.product.title}
                      className="h-16 w-16 object-contain mr-4"
                    />
                    <div>
                      <h3 className="font-bold">{item.product.title}</h3>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold mr-4">
                      ${(item.product.current_price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeAndRefresh(item.product.id)}
                      className="bg-gray-200 text-gray-700 px-2 rounded-l hover:bg-gray-300"
                    >
                      -
                    </button>
                    <button
                      onClick={() => addAndRefresh(item.product.id)}
                      className="bg-gray-200 text-gray-700 px-2 rounded-r hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
            <li className="border-t pt-4 mt-4 flex justify-between">
              <span className="font-bold px-2">Total:</span>
              <span className="font-bold px-2">${calculateTotal()}</span>
            </li>
          </ul>
        ) : (
          <p>Please log in and add items to your cart.</p>
        )}
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Payment Details:</h2>
        <p className="text-xs px-4 lg:px-24 text-center text-gray-500">
          warning, any card details you enter will be sent to a third party,
          please do not enter your real card details, instead enter fake ones
        </p>
        <CardElement className="border p-2 rounded mb-4" />
        <button
          disabled={!stripe || loading}
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
        >
          {loading ? "Processing..." : "Pay"}
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
};

const CheckoutPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutPage;
