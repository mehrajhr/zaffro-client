import React, { useEffect, useState } from "react";
import { CartContext } from "./CartContext";

const CartProvider = ({children}) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("zaffroCart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("zaffroCart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const isInCart = (id) => cart.some((item) => item.id === id);

  const cartInformation = {
    cart,
    addToCart,
    removeFromCart,
    isInCart,
  };

  return (
    <CartContext.Provider value={cartInformation}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
