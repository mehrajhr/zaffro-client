// src/Pages/Cart/Cart.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { HiOutlineTrash } from "react-icons/hi";
import { Plus, Minus } from "lucide-react";
import useCart from "../../hooks/useCart";

const DELIVERY_CHITTAGONG = 70;
const DELIVERY_OUTSIDE = 130;

const Cart = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartCount,
    getSubtotal,
  } = useCart();

  const navigate = useNavigate();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    mobile: "",
    locationType: "inside",
    location:"",
    paymentMethod: "cod",
    bkashSender: "",
    bkashTxn: "",
  });

  const subtotal = getSubtotal();
  const deliveryFee =
    customer.locationType === "inside" ? DELIVERY_CHITTAGONG : DELIVERY_OUTSIDE;
  const total = subtotal + (cart.length ? deliveryFee : 0);

  // --- Stock helper ---
  const getStockForSize = (item) => {
    if (Array.isArray(item.sizes)) {
      const wanted = (item.selectedSize || "").toString().toUpperCase();
      const found = item.sizes.find(
        (s) => String(s.size).toUpperCase() === wanted
      );
      return found ? Number(found.stock || 0) : 0;
    }
    if (item.sizeStock && typeof item.sizeStock === "object") {
      return Number(item.sizeStock[item.selectedSize] ?? 0);
    }
    return 0;
  };

  // --- Quantity handlers ---
  const onIncrease = (item) => {
    const pid = item._id ?? item.id;
    const stockForSize = getStockForSize(item);
    const newQty = (item.quantity || 1) + 1;

    if (stockForSize === 0) {
      toast.error(`${item.selectedSize} is out of stock.`);
      return;
    }
    if (newQty > stockForSize) {
      toast.error(`Only ${stockForSize} available for ${item.selectedSize}.`);
      return;
    }
    updateQuantity(pid, item.selectedSize, newQty);
  };

  const onDecrease = (item) => {
    const pid = item._id ?? item.id;
    const newQty = (item.quantity || 1) - 1;
    if (newQty <= 0) {
      removeFromCart(pid, item.selectedSize);
    } else {
      updateQuantity(pid, item.selectedSize, newQty);
    }
  };

  // --- Proceed to checkout ---
  const handleProceed = () => {
    if (!cart.length) {
      toast.error("Your cart is empty.");
      return;
    }
    setShowCheckoutForm(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  // --- Confirm Order ---
  const handleConfirmOrder = async (e) => {
    e.preventDefault();

    if (!customer.name.trim() || !customer.mobile.trim()) {
      toast.error("Please add your name and mobile number.");
      return;
    }
    if (
      customer.paymentMethod === "bkash" &&
      (!customer.bkashSender || !customer.bkashTxn)
    ) {
      toast.error("Please fill your bKash number and transaction id.");
      return;
    }

    const orderPayload = {
      customer: {
        name: customer.name,
        mobile: customer.mobile,
        locationType: customer.locationType,
        location:customer.location,
        paymentMethod: customer.paymentMethod,
        bkashSender: customer.bkashSender || null,
        bkashTxn: customer.bkashTxn || null,
      },
      items: cart.map((it) => {
        const pid = it._id ?? it.id;
        const unitPrice = it.discountPrice ?? it.price ?? 0;
        return {
          productId: pid,
          name: it.name,
          size: it.selectedSize,
          quantity: it.quantity || 1,
          unitPrice,
          subtotal: unitPrice * (it.quantity || 1),
          image: it.images?.[0] ?? null,
        };
      }),
      subtotal,
      deliveryFee,
      total,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      // ✅ Handle backend failure or insufficient stock
      if (!res.ok || !data.success) {
        const msg =
          data.message || "Order failed due to stock or server issue.";
        toast.error(msg);

        await Swal.fire({
          title: "Order Failed!",
          text: msg,
          icon: "error",
          confirmButtonColor: "#000B58",
        });

        return;
      }

      // ✅ Success
      await Swal.fire({
        title: "Order confirmed!",
        html: `<p>Your order (${data.orderId}) has been placed successfully.</p>`,
        icon: "success",
        confirmButtonColor: "#000B58",
      });

      clearCart();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Order submit error:", err);
      await Swal.fire({
        title: "Network Error",
        text: "Something went wrong while placing your order. Please try again.",
        icon: "error",
        confirmButtonColor: "#000B58",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-base-200 min-h-screen py-8">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">
          Your Cart ({getCartCount()})
        </h1>

        {!cart.length ? (
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="mb-4">Your cart is empty.</p>
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart items */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {cart.map((item) => {
                const unitPrice = item.discountPrice ?? item.price ?? 0;
                const qty = item.quantity || 1;
                const stockForSize = getStockForSize(item);
                const lineTotal = unitPrice * qty;
                const pid = item._id ?? item.id;

                return (
                  <div
                    key={`${pid}-${item.selectedSize}`}
                    className="bg-white p-4 rounded-lg shadow flex gap-4"
                  >
                    <div className="w-24 h-24 rounded overflow-hidden border">
                      <img
                        src={item.images?.[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-sm text-gray-600">
                            Size: {item.selectedSize}
                          </p>
                          <p className="text-sm text-gray-600">
                            Price: {unitPrice} BDT
                          </p>
                          <p
                            className={`text-sm font-medium ${
                              stockForSize > 0
                                ? "text-green-600"
                                : "text-red-500"
                            }`}
                          >
                            {stockForSize > 0
                              ? `Stock: ${stockForSize}`
                              : "Out of stock"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{lineTotal} BDT</p>
                          <button
                            onClick={() =>
                              removeFromCart(pid, item.selectedSize)
                            }
                            className="mt-2 text-sm text-red-500 hover:underline flex items-center gap-1"
                          >
                            <HiOutlineTrash /> Remove
                          </button>
                        </div>
                      </div>

                      {/* Quantity controls */}
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          onClick={() => onDecrease(item)}
                          className="p-2 border rounded hover:bg-gray-100"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="px-3 py-1 border rounded bg-gray-50">
                          {qty}
                        </span>

                        <button
                          onClick={() => onIncrease(item)}
                          className="p-2 border rounded hover:bg-gray-100"
                        >
                          <Plus size={14} />
                        </button>

                        <p className="text-sm text-gray-500">
                          Max: {stockForSize}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="bg-white p-6 rounded-lg shadow h-fit">
              <h4 className="font-semibold mb-4">Order Summary</h4>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{subtotal} BDT</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery</span>
                <span>{cart.length ? deliveryFee : 0} BDT</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{total} BDT</span>
              </div>

              <button
                onClick={handleProceed}
                className="mt-4 w-full btn btn-primary"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}

        {/* Checkout Form */}
        {showCheckoutForm && cart.length > 0 && (
          <form
            onSubmit={handleConfirmOrder}
            className="mt-8 bg-white p-6 rounded-lg shadow max-w-3xl mx-auto"
          >
            <h3 className="text-xl font-semibold mb-4">Checkout Details</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full"
                value={customer.name}
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Mobile Number"
                className="input input-bordered w-full"
                value={customer.mobile}
                onChange={(e) =>
                  setCustomer({ ...customer, mobile: e.target.value })
                }
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <select
                className="select select-bordered w-full"
                value={customer.locationType}
                onChange={(e) =>
                  setCustomer({ ...customer, locationType: e.target.value })
                }
              >
                <option value="inside">Inside Chittagong</option>
                <option value="outside">Outside Chittagong</option>
              </select>

              <input
                type="text"
                placeholder= {`Your Location ${customer.locationType} Chittagong`}
                className="input input-bordered w-full"
                value={customer.location}
                onChange={(e) =>
                  setCustomer({ ...customer, location: e.target.value })
                }
                required
              />

              <select
                className="select select-bordered w-full"
                value={customer.paymentMethod}
                onChange={(e) =>
                  setCustomer({ ...customer, paymentMethod: e.target.value })
                }
              >
                <option value="cod">Cash on Delivery</option>
                <option value="bkash">bKash</option>
              </select>
            </div>

            {customer.paymentMethod === "bkash" && (
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <input
                  type="text"
                  placeholder="bKash Sender Number"
                  className="input input-bordered w-full"
                  value={customer.bkashSender}
                  onChange={(e) =>
                    setCustomer({ ...customer, bkashSender: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Transaction ID"
                  className="input input-bordered w-full"
                  value={customer.bkashTxn}
                  onChange={(e) =>
                    setCustomer({ ...customer, bkashTxn: e.target.value })
                  }
                />
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCheckoutForm(false)}
                className="px-4 py-2 border rounded"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? "Placing Order..." : "Confirm Order"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Cart;
