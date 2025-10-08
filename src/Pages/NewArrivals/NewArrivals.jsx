import { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Toaster } from "react-hot-toast";
import ProductCard from "../Products/ProductCard";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Loading from "../Loading/Loading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [priceSort, setPriceSort] = useState(""); // asc | desc
  const [showCategory, setShowCategory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const categories = ["all", "hoodie", "tshirt", "poloshirt"];

  useEffect(() => {
    let url = `https://zaffro-server.vercel.app/products/new-arrivals`;
    if (category !== "all") {
      url += `?category=${category}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
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

  if (error) return <ErrorMessage></ErrorMessage>;

  return (
    <div className="  px-4 py-8 flex flex-col gap-8">
      <Toaster position="top-right" />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-50 to-pink-50 rounded-xl overflow-hidden shadow-lg flex flex-col lg:flex-row items-center gap-6 p-8">
        {/* Left Text */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
            New Arrivals
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Fresh styles, just dropped. Grab the latest pieces before they sell
            out!
          </p>
          <Link to="/products">
            <button className="mt-6 px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-neutral hover:text-black cursor-pointer transition duration-300">
              Shop All
            </button>
          </Link>
        </motion.div>

        {/* Right Image / Banner */}
        <motion.div
          className="flex-1 hidden md:flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://i.ibb.co.com/8DRL09M2/Black-and-White-Simple-Fashion-Sale-Banner.jpg"
            alt="New Arrivals"
            className="w-full max-w-md rounded-xl shadow-md"
          />
        </motion.div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-1/4 flex flex-col gap-6">
          {/* Category Dropdown */}
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowCategory(!showCategory)}
            >
              <h3 className="font-semibold text-lg">Category</h3>
              {showCategory ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {showCategory && (
              <div className="mt-4 flex flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-full font-semibold capitalize transition-all duration-200 ${
                      category === cat
                        ? "bg-secondary text-white"
                        : "bg-base-200 text-black hover:bg-base-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price Filter */}
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <h3 className="font-semibold mb-2 text-lg">Sort by Price</h3>
            <select
              className="select w-full border-gray-300 rounded-md"
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
            >
              <option value="">Select</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>

        {/* Separator */}
        <div className="hidden lg:block w-px bg-gray-300 mx-2"></div>

        {/* Product Grid */}
        <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={{ ...product, isNewArrival: true }} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
