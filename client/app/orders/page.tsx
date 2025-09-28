"use client";
import { getUserOrders } from "@/app/functions";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getOrders = async () => {
      const orders = await getUserOrders();
      setOrders(orders);
    };
    getOrders();
  }, []);

  const handleViewOrder = (orderId) => {
    router.push(`/orders/${orderId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
        {orders.length === 0 ? (
          <p className="text-lg text-center text-gray-500">
            You have no orders yet.
          </p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              // Calculate the total price for the order
              const totalPrice = order.items.reduce((total, item) => {
                return total + item.product.current_price * item.quantity;
              }, 0);

              return (
                <div
                  key={order.id}
                  className="border rounded-lg p-4 shadow-sm bg-gray-50"
                >
                  <h2 className="text-xl font-semibold">
                    Order ID: {order.id}
                  </h2>
                  <p className="text-gray-600">
                    Date: {new Date(order.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">Status: {order.status}</p>
                  <h3 className="font-semibold mt-2">Items:</h3>
                  <ul className="list-disc list-inside ml-5">
                    {order.items.map((item, index) => (
                      <li key={index} className="text-gray-700">
                        {item.product.title} - Quantity: {item.quantity} -
                        Price: ${item.product.current_price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                  <p className="font-bold mt-4">
                    Total: ${totalPrice.toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleViewOrder(order.id)}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  >
                    View Order
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default OrdersPage;
