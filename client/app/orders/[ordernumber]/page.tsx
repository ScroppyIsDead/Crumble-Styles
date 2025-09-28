"use client";
import { getOrder } from "@/app/functions";
import React, { useEffect, useState } from "react";

const OrderPage = ({ params }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const requestOrder = async () => {
      const fetchedOrder = await getOrder(params.ordernumber);
      setOrder(fetchedOrder);
    };
    requestOrder();
  }, [params.ordernumber]);

  if (!order) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <a href="/orders">Go back to orders</a>
      <section className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6 mt-10">
        <h1 className="text-3xl font-bold mb-4">Order Details</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
          <p className="text-gray-600">
            Date: {new Date(order.created_at).toLocaleDateString()}
          </p>
          <p className="text-gray-600">Status: {order.status}</p>
        </div>
        <h3 className="font-semibold text-lg mb-2">Items:</h3>
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center p-4 border rounded-lg shadow-sm bg-gray-50"
            >
              <img
                src={`http://localhost:8000${item.product.image}`}
                alt={item.product.title}
                className="w-24 h-24 object-cover rounded-lg mr-4"
              />
              <div className="flex-1">
                <h4 className="text-lg font-semibold">{item.product.title}</h4>
                <p className="text-gray-600">{item.product.description}</p>
                <p className="text-gray-700">
                  Quantity: {item.quantity} - Price: $
                  {item.product.current_price} - Total: $
                  {(item.product.current_price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 font-bold">
          Total Price: $
          {order.items
            .reduce(
              (total, item) =>
                total + item.product.current_price * item.quantity,
              0
            )
            .toFixed(2)}
        </div>
      </section>
    </div>
  );
};

export default OrderPage;
