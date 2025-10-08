import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import router from "./routes/router.jsx";
import CartProvider from "./Context/CartProvider.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="font-serif bg-base-200 min-h-screen">
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router}></RouterProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  </StrictMode>
);
