// CartProvider.jsx
import React, { useEffect, useState } from "react";
import { CartContext } from "./CartContext";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("zaffroCart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("zaffroCart", JSON.stringify(cart));
  }, [cart]);

  // add product (product must include selectedSize and quantity if provided)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) =>
          item._id === product._id &&
          item.selectedSize === product.selectedSize
      );

      if (existing) {
        // increase quantity but cap at 3
        return prevCart.map((item) =>
          item._id === product._id && item.selectedSize === product.selectedSize
            ? { ...item, quantity: Math.min((item.quantity || 1) + (product.quantity || 1), 3) }
            : item
        );
      }

      // add with quantity (default 1), ensure cap at 3
      return [...prevCart, { ...product, quantity: Math.min(product.quantity || 1, 3) }];
    });
  };

  // remove specific variant
  const removeFromCart = (productId, size) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item._id === productId && item.selectedSize === size))
    );
  };

  // update quantity directly (used by + / -). qty should be validated (1..3)
  const updateQuantity = (productId, size, qty) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === productId && item.selectedSize === size
            ? { ...item, quantity: qty }
            : item
        )
        .filter(Boolean)
    );
  };

  // clear cart completely
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("zaffroCart");
  };

  // isInCart: check for specific variant
  const isInCart = (productId, size) =>
    cart.some((item) => item._id === productId && item.selectedSize === size);

  // total items (sum of quantities)
  const getCartCount = () => cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // subtotal (BDT)
  const getSubtotal = () =>
    cart.reduce((sum, item) => {
      const price = item.discountPrice ?? item.price ?? 0;
      return sum + (price * (item.quantity || 1));
    }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        getCartCount,
        getSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
