import { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import ProductCard from "./ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [priceSort, setPriceSort] = useState(""); // asc | desc
  const [showCategory, setShowCategory] = useState(false);

  const categories = ["all", "hoodie", "tshirt", "poloshirt"];

  useEffect(() => {
    let url = `http://localhost:5000/products?category=${category}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // Client-side price sort
        if (priceSort === "asc") {
          data.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        } else if (priceSort === "desc") {
          data.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        }
        setProducts(data);
      });
  }, [category, priceSort]);

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
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
      <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
