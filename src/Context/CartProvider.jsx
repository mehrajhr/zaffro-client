import React, { useEffect, useState } from "react";
import { CartContext } from "./CartContext";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // ✅ Load cart from localStorage initially (fix for refresh issue)
    const storedCart = localStorage.getItem("zaffroCart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("zaffroCart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const isInCart = (id) => cart.some((item) => item._id === id);

  // ✅ Function to get cart count (for navbar badge)
  const getCartCount = () => cart.length;

  const cartInformation = {
    cart,
    addToCart,
    removeFromCart,
    isInCart,
    getCartCount,
  };

  return (
    <CartContext.Provider value={cartInformation}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
