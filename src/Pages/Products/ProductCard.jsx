import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const inCart = isInCart(product._id);

  const handleCart = () => {
    if (inCart) {
      removeFromCart(product._id);
      toast("Removed from cart", { duration: 2000 });
    } else {
      addToCart(product);
      toast("Added to cart", { duration: 2000 });
    }
  };

  return (
    <div className="bg-neutral rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {/* Product Image */}
      <Link to={`/product/${product.slug}-${product._id}`}>
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          {product.isNewArrival && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              New
            </span>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-lg text-white mb-1">{product.name}</h3>

        {/* Price */}
        {product.discountPrice ? (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-400 line-through">{product.price} BDT</span>
            <span className="text-white font-bold">{product.discountPrice} BDT</span>
          </div>
        ) : (
          <span className="text-white font-bold mb-2">{product.price} BDT</span>
        )}

        <span className="text-sm text-secondary capitalize mb-4">{product.category}</span>

        {/* Button at bottom */}
        <div className="mt-auto">
          <button
            onClick={handleCart}
            className={`w-full py-2 rounded-lg font-semibold transition-colors duration-200 ${
              inCart
                ? "bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                : "bg-secondary text-primary hover:bg-primary hover:text-white"
            }`}
          >
            {inCart ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
