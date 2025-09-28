"use client";
import React, { useEffect, useState } from "react";
import { get_favorites, getSaleProduct } from "../functions";
import SaleProductCard from "../components/SaleProductCard";

const page = () => {
  const [saleProductList, setSaleProductsList] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        await getSaleProduct(setSaleProductsList);
      } catch (error) {
        console.error("Failed to fetch sale products:", error);
      }
    };
    const fetchFavorites = async () => {
      try {
        await get_favorites(setFavoriteList);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };
    fetchFavorites();
    fetchSaleProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Sale Products</h1>
      {saleProductList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {saleProductList.map((saleProduct) => (
            <SaleProductCard
              key={saleProduct.id}
              favoriteList={favoriteList}
              product={saleProduct.product}
            />
          ))}
        </div>
      ) : (
        <p>it seems there are no items on sale currently, check later though</p>
      )}
    </div>
  );
};

export default page;
