import { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import ProductCard from "../Products/ProductCard";

const Offers = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [priceSort, setPriceSort] = useState(""); // asc | desc
  const [showCategory, setShowCategory] = useState(false);

  const categories = ["all", "hoodie", "tshirt", "poloshirt"];

  useEffect(() => {
    let url = `http://localhost:5000/products/discounts`;
    if (category !== "all") url += `?category=${category}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (priceSort === "asc") {
          data.sort(
            (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price)
          );
        } else if (priceSort === "desc") {
          data.sort(
            (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price)
          );
        }
        setProducts(data);
      });
  }, [category, priceSort]);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
      <Toaster position="top-right" />

      {/* Hero Banner */}
      <div className="relative rounded-lg overflow-hidden shadow-lg mb-8">
        <div className="bg-base-200 p-8 lg:p-16 rounded-lg flex flex-col lg:flex-row items-center justify-between gap-6 border border-accent/30">
          {/* Left Text */}
          <div className="text-neutral max-w-lg flex flex-col gap-4">
            <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Hot Deals Just For You!
            </h1>
            <p className="text-lg text-base-content/80">
              Check out the latest discounts on hoodies, t-shirts, and polos.
              Only limited stock available – don’t miss out!
            </p>
            <button className="btn btn-secondary text-primary w-max px-6 py-3 font-semibold hover:scale-105 transition-transform duration-300">
              Shop Now
            </button>
          </div>

          {/* Right Image */}
          <motion.img
            src="https://i.imghippo.com/files/NzRm5071wg.jpg"
            alt="Sale Banner"
            className="w-full lg:w-1/3 h-72 object-cover rounded-lg shadow-xl border border-accent/20"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-1/4 flex flex-col gap-4">
          <div className="bg-base-200 p-4 rounded-lg shadow-md">
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
                        ? "bg-secondary text-primary"
                        : "bg-base-100 text-neutral hover:bg-base-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-base-200 p-4 rounded-lg shadow-md">
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

        {/* Separator */}
        <div className="hidden lg:block w-px bg-base-300 mx-2"></div>

        {/* Product Grid with motion */}
        <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
};

export default Offers;
