import { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Toaster } from "react-hot-toast";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import Loading from "../Loading/Loading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [priceSort, setPriceSort] = useState(""); // asc | desc
  const [showCategory, setShowCategory] = useState(false);

  const categories = ["all", "hoodie", "tshirt", "poloshirt"];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let url = `https://zaffro-server.vercel.app/products?category=${category}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // Client-side price sort
        if (priceSort === "asc") {
          data.sort(
            (a, b) =>
              (a.discountPrice || a.price) - (b.discountPrice || b.price)
          );
        } else if (priceSort === "desc") {
          data.sort(
            (a, b) =>
              (b.discountPrice || b.price) - (a.discountPrice || a.price)
          );
        }
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [category, priceSort]);

  if (loading) {
    return <Loading></Loading>;
  }

  if (error)
    return (
      <ErrorMessage></ErrorMessage>
    );

  return (
    <div className="px-4 py-6 flex flex-col lg:flex-row gap-6">
      <Toaster position="top-right" />

      {/* Sidebar Filter */}
      <div className="w-full lg:w-1/4 flex flex-col gap-4">
        {/* Category Dropdown */}
        <div className="bg-base-200 p-4 rounded-lg shadow-sm">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowCategory(!showCategory)}
          >
            <h3 className="font-semibold text-lg">Category</h3>
            {showCategory ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          {showCategory && (
            <div className="mt-3 flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full font-semibold capitalize transition-all duration-200 ${
                    category === cat
                      ? "bg-secondary text-white"
                      : "bg-base-100 text-black hover:bg-base-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price Filter */}
        <div className="bg-base-200 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2 text-lg">Sort by Price</h3>
          <select
            className="select w-full"
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value)}
          >
            <option value="">Select</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      {/* Separator for UX */}
      <div className="hidden lg:block w-px bg-base-300 mx-2"></div>

      {/* Product Grid */}
      <div className="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Products;
