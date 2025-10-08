import { Link, NavLink } from "react-router";
import { LogOut, ShoppingCart, User } from "lucide-react";
import ZaffroLogo from "../../logo/ZaffroLogo";
import "./Navbar.css";
import useCart from "../../hooks/useCart";
import useAuthcontext from "../../hooks/useAuthcontext";
import axios from "axios";
import Swal from "sweetalert2";
import useUserRole from "../../hooks/useUserRole";

const Navbar = () => {
  const { getCartCount } = useCart();
  const items = getCartCount();
  const { signWithGoogle, user, logOutUser, setUser } = useAuthcontext();
  const { role, roleLoading } = useUserRole();

  const handleLogin = () => {
    signWithGoogle()
      .then(async (res) => {
        const user = res.user;
        const userData = {
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
          role: "customer",
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };
        const result = await axios.post(
          "https://zaffro-server.vercel.app/users",
          userData
        );

        Swal.fire("Success!", "Account login successfully.", "success");
      })
      .catch((err) => {
        Swal.fire("Error", "Login failed.", "error");
      });
  };

  const handleLogout = () => {
    logOutUser()
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have been logged out successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
        setUser(null);
      })
      .catch((err) => {});
  };

  const lists = (
    <>
      {/* Home */}
      <li>
        <NavLink to="/" className="w-fit">
          Home
        </NavLink>
      </li>

      {/* Shop Dropdown */}
      <li>
        <NavLink to="/products" className="w-fit">
          Products
        </NavLink>
      </li>

      {/* New Arrivals */}
      <li>
        <NavLink to="/new-arrivals" className="w-fit">
          New Arrivals
          <span className="bg-accent text-white text-xs px-1 rounded max-w-fit">
            New
          </span>
        </NavLink>
      </li>

      {/* Sale / Discounts */}
      <li>
        <NavLink to="/sale/offers" className="w-fit">
          Sale
          <span className="bg-red-500 text-white text-xs px-1 rounded max-w-fit">
            Hot
          </span>
        </NavLink>
      </li>

      {/* About */}
      <li>
        <NavLink to="/about" className="w-fit">
          About
        </NavLink>
      </li>

      {/* Contact */}
      <li>
        <NavLink to="/contact" className="w-fit">
          Contact
        </NavLink>
      </li>
      {user && role === "admin" && (
        <li>
          <NavLink to="/dashboard" className="w-fit">
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar text-neutral-content bg-neutral">
      {/* Left Side (Logo + Mobile Menu) */}
      <div className="navbar-start">
        {/* Mobile Menu Dropdown */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost text-black text-xl">
            ☰
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 text-black rounded-box w-52"
          >
            {lists}
          </ul>
        </div>

        {/* Brand Logo */}
        <ZaffroLogo />
      </div>

      {/* Center Menu (Desktop only) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-4 text-lg text-black">
          {lists}
        </ul>
      </div>

      {/* Right Side (Cart + Login) */}
      <div className="navbar-end flex items-center gap-4">
        {/* Cart */}
        <Link to="/cart" className="relative">
          <ShoppingCart className="text-black" size={24} />
          <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {items}
          </span>
        </Link>

        {/* Login/Register */}
        {user ? (
          <button
            onClick={() => handleLogout()}
            className="btn text-primary font-semibold"
          >
            {" "}
            <LogOut size={18} className="mr-1"></LogOut> Logout
          </button>
        ) : (
          <Link
            className="btn text-primary font-semibold"
            onClick={() => {
              handleLogin();
            }}
          >
            <User size={18} className="mr-1" />
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
