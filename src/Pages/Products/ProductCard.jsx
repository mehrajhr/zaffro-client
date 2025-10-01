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
    <div className="bg-neutral rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/product/${product.slug}-${product._id}`}>
        <img src={product.images[0]} alt={product.name} className="w-full h-64 object-cover"/>
      </Link>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-lg text-white">{product.name}</h3>
        {product.discountPrice ? (
          <div className="flex items-center gap-2">
            <span className="text-white line-through">{product.price} BDT</span>
            <span className="text-white font-bold">{product.discountPrice} BDT</span>
          </div>
        ) : (
          <span className="text-white font-bold">{product.price} BDT</span>
        )}
        <span className="text-sm text-secondary capitalize">{product.category}</span>
        <button
          onClick={handleCart}
          className={`mt-2 btn ${inCart ? "btn-outline btn-error" : "btn-secondary text-primary"} w-full`}
        >
          {inCart ? "Remove from Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
