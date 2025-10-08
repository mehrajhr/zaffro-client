import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import ProductCard from "../Products/ProductCard";
import Loading from "../Loading/Loading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://zaffro-server.vercel.app/products") // replace with your backend URL
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.slice(0, 6)); // show only 6 products
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading></Loading>;

  if (error) {
    return <ErrorMessage></ErrorMessage>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-black">
          Explore Our Collection
        </h2>
        <p className="text-gray-700">
          Discover the latest arrivals and most popular picks from Zaffro.
        </p>
      </div>

      {/* Product Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </motion.div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <Link
          to="/products"
          className="inline-block bg-white text-black px-8 py-3 rounded-lg font-semibold shadow hover:bg-gray-200 transition-all duration-300"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
