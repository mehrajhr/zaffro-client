import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import useCart from "../../hooks/useCart";
import Loading from "../Loading/Loading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const ProductDetails = () => {
  const { id } = useParams(); // id = "slug-_id"
  const realId = id.split("-").pop(); // extract the _id
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://zaffro-server.vercel.app/products/${realId}`);
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.images?.[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [realId]);

  if (!realId || realId.length !== 24 || !product) {
    return <ErrorMessage />;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      Swal.fire({
        icon: "warning",
        title: "Select a size first!",
        background: "white",
        color: "black",
      });
      return;
    }

    addToCart({ ...product, selectedSize, quantity });

    // ✅ Show success toast
    toast.success(`Added ${product.name} (${selectedSize}) to cart`);
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-base-200 min-h-screen py-12 px-4">
      {/* Toast container (only once in the app, but keeping here for safety) */}
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT: Image Section */}
        <div>
          <div className="bg-white rounded-xl overflow-hidden">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-[450px] object-cover"
            />
          </div>

          {/* Thumbnail images */}
          <div className="flex gap-3 mt-4 justify-center">
            {product?.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                  selectedImage === img
                    ? "border-black"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-black mb-2">
              {product?.name}
            </h2>
            <p className="text-gray-700 mb-4">{product?.brand}</p>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              {product?.discountPrice ? (
                <>
                  <span className="text-gray-500 line-through text-lg">
                    {product?.price}৳
                  </span>
                  <span className="text-gray-700 text-2xl font-bold">
                    {product?.discountPrice}৳
                  </span>
                </>
              ) : (
                <span className="text-gray-700 text-2xl font-bold">
                  {product?.price}৳
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product?.description}
            </p>

            {/* Size Selection */}
            <div className="mb-6">
              <h4 className="text-black font-semibold mb-2">Select Size</h4>
              <div className="flex flex-wrap gap-2">
                {product?.sizes?.map((s) => (
                  <button
                    key={s.size}
                    disabled={s.stock === 0}
                    onClick={() => setSelectedSize(s.size)}
                    className={`px-4 py-2 rounded-md border text-sm font-semibold transition ${
                      s.stock === 0
                        ? "bg-gray-700 text-gray-500 cursor-not-allowed line-through"
                        : selectedSize === s.size
                        ? "bg-black text-white"
                        : "bg-transparent border-black text-black hover:bg-black hover:text-white"
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <h4 className="text-black font-semibold">Quantity:</h4>
              <div className="flex items-center border border-gray-500 rounded-md">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-black hover:bg-black hover:text-white"
                >
                  -
                </button>
                <span className="px-4 py-1 text-black">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => (q < 3 ? q + 1 : q))}
                  className="px-3 py-1 text-black hover:bg-black hover:text-white"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="bg-black text-white cursor-pointer font-semibold w-full py-3 rounded-lg "
            >
              Add to Cart
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8">
            <p className="text-gray-700 text-sm">
              <b>Category:</b> {product?.category}
            </p>
            <p className="text-gray-700 text-sm">
              <b>Tags:</b> {product?.tags?.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
