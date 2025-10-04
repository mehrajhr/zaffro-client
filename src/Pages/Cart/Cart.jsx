import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { HiOutlineTrash } from "react-icons/hi";
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
  const [customer, setCustomer] = useState({
    name: "",
    mobile: "",
    locationType: "inside",
    paymentMethod: "cod",
    bkashSender: "",
    bkashTxn: "",
  });

  const subtotal = getSubtotal();
  const deliveryFee =
    customer.locationType === "inside" ? DELIVERY_CHITTAGONG : DELIVERY_OUTSIDE;
  const total = subtotal + (cart.length ? deliveryFee : 0);

  const onIncrease = (item) => {
    const newQty = Math.min((item.quantity || 1) + 1, 3);
    updateQuantity(item._id, item.selectedSize, newQty);
  };

  const onDecrease = (item) => {
    const newQty = (item.quantity || 1) - 1;
    if (newQty <= 0) {
      removeFromCart(item._id, item.selectedSize);
    } else {
      updateQuantity(item._id, item.selectedSize, newQty);
    }
  };

  const handleProceed = () => {
    if (!cart.length) {
      toast.error("Your cart is empty.");
      return;
    }
    setShowCheckoutForm(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

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

    const lines = cart.map(
      (it, idx) =>
        `${idx + 1}. ${it.name} — ${it.selectedSize} x${it.quantity || 1} — ${
          (it.discountPrice ?? it.price) * (it.quantity || 1)
        } BDT`
    );
    lines.push(`Subtotal: ${subtotal} BDT`);
    lines.push(`Delivery: ${deliveryFee} BDT`);
    lines.push(`Total: ${total} BDT`);

    const htmlSummary = `
      <div style="text-align:left;">
        <p><strong>Name:</strong> ${customer.name}</p>
        <p><strong>Mobile:</strong> ${customer.mobile}</p>
        <p><strong>Location:</strong> ${
          customer.locationType === "inside"
            ? "Chittagong City"
            : "Outside Chittagong"
        }</p>
        <p><strong>Payment:</strong> ${
          customer.paymentMethod === "bkash" ? "bKash" : "Cash on Delivery"
        }</p>
        <hr/>
        <p><strong>Order:</strong></p>
        <div>${lines.join("<br/>")}</div>
      </div>
    `;

    const result = await Swal.fire({
      title: "Confirm your order",
      html: htmlSummary,
      showCancelButton: true,
      confirmButtonText: "Confirm Order",
      cancelButtonText: "Edit",
      confirmButtonColor: "#000B58",
      width: 600,
    });

    if (result.isConfirmed) {
      await Swal.fire({
        title: "Order confirmed!",
        html: `<p>Thank you — your order is placed. Our team will contact you very soon.</p>`,
        icon: "success",
        confirmButtonColor: "#000B58",
      });

      clearCart();
      navigate("/", { replace: true });
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
                const lineTotal = unitPrice * (item.quantity || 1);
                return (
                  <div
                    key={`${item._id}-${item.selectedSize}`}
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
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{lineTotal} BDT</p>
                          <button
                            onClick={() =>
                              removeFromCart(item._id, item.selectedSize)
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
                          className="px-3 py-1 border rounded hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border rounded bg-gray-50">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => onIncrease(item)}
                          className="px-3 py-1 border rounded hover:bg-gray-100"
                        >
                          +
                        </button>
                        <p className="text-sm text-gray-500">Max 3</p>
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
                Proceed to Order
              </button>
            </div>
          </div>
        )}

        {/* Checkout form */}
        {showCheckoutForm && cart.length && (
          <form
            onSubmit={handleConfirmOrder}
            className="mt-8 bg-white p-6 rounded-lg shadow max-w-3xl mx-auto"
          >
            <h2 className="text-xl font-semibold mb-4">Delivery & Payment</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Full name</label>
                <input
                  className="input input-bordered w-full"
                  value={customer.name}
                  onChange={(e) =>
                    setCustomer((s) => ({ ...s, name: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Mobile number</label>
                <input
                  className="input input-bordered w-full"
                  value={customer.mobile}
                  onChange={(e) =>
                    setCustomer((s) => ({ ...s, mobile: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Location</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="location"
                      checked={customer.locationType === "inside"}
                      onChange={() =>
                        setCustomer((s) => ({ ...s, locationType: "inside" }))
                      }
                    />
                    Inside Chittagong ({DELIVERY_CHITTAGONG} BDT)
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="location"
                      checked={customer.locationType === "outside"}
                      onChange={() =>
                        setCustomer((s) => ({ ...s, locationType: "outside" }))
                      }
                    />
                    Outside Chittagong ({DELIVERY_OUTSIDE} BDT)
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Payment method</h3>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    checked={customer.paymentMethod === "cod"}
                    onChange={() =>
                      setCustomer((s) => ({ ...s, paymentMethod: "cod" }))
                    }
                  />
                  Cash on Delivery
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    checked={customer.paymentMethod === "bkash"}
                    onChange={() =>
                      setCustomer((s) => ({ ...s, paymentMethod: "bkash" }))
                    }
                  />
                  bKash (manual)
                </label>
              </div>

              {customer.paymentMethod === "bkash" &&(
                <div className="mt-4 border p-4 rounded bg-gray-50">
                  <p className="text-sm mb-2">
                    Send ( bdt {total}/- ) to <b>+880 1XX-XXX-XXXX</b>
                    <br />
                    Make sure to (send money) before submitting the order.
                  </p>
                  <label className="block text-sm mb-1">
                    Your bKash number
                  </label>
                  <input
                    className="input input-bordered w-full mb-2"
                    value={customer.bkashSender}
                    onChange={(e) =>
                      setCustomer((s) => ({
                        ...s,
                        bkashSender: e.target.value,
                      }))
                    }
                  />
                  <label className="block text-sm mb-1">Transaction ID</label>
                  <input
                    className="input input-bordered w-full"
                    value={customer.bkashTxn}
                    onChange={(e) =>
                      setCustomer((s) => ({ ...s, bkashTxn: e.target.value }))
                    }
                  />
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCheckoutForm(false)}
                className="px-4 py-2 border rounded"
              >
                Back
              </button>
              <button type="submit" className=" btn btn-primary">
                Confirm Order
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Cart;
