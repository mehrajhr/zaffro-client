import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const inCart = isInCart(product._id);

  const handleCart = () => {
    // ✅ Show Size Selection Modal
    Swal.fire({
      title: `<h2 class="text-xl font-bold text-black">${product.name}</h2>`,
      html: `
        <div class="flex flex-col items-center">
          <img src="${product.images[0]}" class="w-40 h-40 object-cover rounded-lg mb-4 shadow-lg"/>
          <p class="text-black mb-3">Select a size:</p>
          <div class="flex flex-wrap gap-2 justify-center">
            ${product.sizes
              .map(
                (s) => `
                <button 
                  class="size-btn px-4 py-2 rounded-lg font-semibold transition ${
                    s.stock > 0
                      ? "bg-black text-white hover:bg-base-200 hover:text-black"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed line-through"
                  }"
                  data-size="${s.size}" 
                  ${s.stock === 0 ? "disabled" : ""}
                >
                  ${s.size}
                </button>`
              )
              .join("")}
          </div>
        </div>
      `,
      background: "white",
      color: "#000",
      showCancelButton: true,
      confirmButtonText: "Add to Cart",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#00ADB5", // your theme secondary
      preConfirm: () => {
        const selected = document.querySelector(".size-btn.selected");
        if (!selected) {
          Swal.showValidationMessage("Please select a size first!");
          return false;
        }
        return selected.getAttribute("data-size");
      },
      didOpen: () => {
        const sizeButtons = Swal.getPopup().querySelectorAll(".size-btn");
        sizeButtons.forEach((btn) => {
          if (!btn.disabled) {
            btn.addEventListener("click", () => {
              sizeButtons.forEach((b) =>
                b.classList.remove(
                  "ring-2",
                  "ring-offset-2",
                  "ring-[#00ADB5]",
                  "bg-primary",
                  "selected"
                )
              );
              btn.classList.add(
                "ring-2",
                "ring-offset-2",
                "ring-[#00ADB5]",
                "bg-primary",
                "text-white",
                "selected"
              );
            });
          }
        });
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const selectedSize = result.value;

        // ✅ Add product with selectedSize (unique per size)
        addToCart({ ...product, selectedSize });
        toast.success(`Added ${product.name} (${selectedSize}) to cart`);
      }
    });
  };

  return (
    <div className="bg-neutral rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {/* Product Image */}
      <Link to={`/products/${product.slug}-${product._id}`}>
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
        <h3 className="font-semibold text-lg text-black mb-1">{product.name}</h3>

        {/* Price */}
        {product.discountPrice ? (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-400 line-through">{product.price} BDT</span>
            <span className="text-black font-bold">{product.discountPrice} BDT</span>
          </div>
        ) : (
          <span className="text-black font-bold mb-2">{product.price} BDT</span>
        )}

        <span className="text-sm text-secondary capitalize mb-4">
          {product.category}
        </span>

        {/* Button */}
        <div className="mt-auto">
          <button
            onClick={handleCart}
            className="w-full py-2 rounded-lg font-semibold transition-colors duration-200 bg-secondary text-white cursor-pointer"
          >
           Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
