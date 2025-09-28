"use client";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import SaleProductCard from "../components/SaleProductCard";
import { get_products, get_favorites } from "../functions";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await get_products(setProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    const fetchFavorites = async () => {
      try {
        await get_favorites(setFavoriteList);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };

    fetchProducts();
    fetchFavorites();
  }, []);
  console.log(products);
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id}>
            {Number(product.price) === product.current_price ? (
              <ProductCard
                key={product.id}
                product={product}
                favoriteList={favoriteList}
              />
            ) : (
              <SaleProductCard
                key={product.id}
                favoriteList={favoriteList}
                product={product}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductsPage;
