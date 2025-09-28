"use client";
import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import SaleProductCard from "./components/SaleProductCard";
import { get_products, get_favorites, sendMail } from "./functions";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const [email, setEmail] = useState("");
  const [clickSub, setclickSub] = useState("Subscribe");

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    sendMail(event, email)
      .then(() => {
        setclickSub("Subscribed");
      })
      .catch((error) => {
        console.error("Failed to subscribe:", error);
      });
  };

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

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-800 text-white">
        <div className="relative max-w-7xl mx-auto p-6 lg:p-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Crumble Styles</h1>
          <p className="text-xl mb-8">
            Discover the latest trends in fashion and style. Shop now for
            exclusive offers!
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/products"
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg"
            >
              Shop Now
            </a>
            <a
              href="/register"
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg text-lg"
            >
              Create an Account
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto p-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => (
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
      </section>

      {/* Special Offers Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto p-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Special Offers</h2>
          <p className="text-lg mb-4">
            Check out our limited-time offers and exclusive deals.
          </p>
          <a
            href="/special-offers"
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg text-lg"
          >
            View Offers
          </a>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-200 py-12">
        <div className="max-w-7xl mx-auto p-6 text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
          <div className="flex flex-col sm:flex-row gap-8">
            <blockquote className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-lg mb-4">
                "Great products and fantastic service!"
              </p>
              <cite className="block font-semibold">John Doe</cite>
            </blockquote>
            <blockquote className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-lg mb-4">
                "I love my new clothes! Will shop again."
              </p>
              <cite className="block font-semibold">Jane Smith</cite>
            </blockquote>
            {/* Add more testimonials as needed */}
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="bg-blue-500 text-white py-12">
        <div className="max-w-7xl mx-auto p-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-6">
            Subscribe to our newsletter to receive the latest news and exclusive
            offers.
          </p>
          <form onSubmit={handleButtonClick} className="flex justify-center">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              className="p-3 text-black rounded-l-lg border-none"
              required
            />
            <button
              type="submit"
              className="bg-white text-blue-500 py-3 px-6 rounded-r-lg font-semibold"
            >
              {clickSub}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
