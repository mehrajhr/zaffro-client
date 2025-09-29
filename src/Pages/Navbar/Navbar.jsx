import { Link } from "react-router";
import { ShoppingCart, User } from "lucide-react";
import ZaffroLogo from "../../logo/ZaffroLogo";

const Navbar = () => {
  const lists = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
    </>
  );

  return (
    <div className="navbar text-neutral-content">
      {/* Left Side (Logo + Mobile Menu) */}
      <div className="navbar-start">
        {/* Mobile Menu Dropdown */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost text-xl">
            ☰
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-neutral rounded-box w-52"
          >
            {lists}
          </ul>
        </div>

        {/* Brand Logo */}
        <ZaffroLogo></ZaffroLogo>
      </div>

      {/* Center Menu (Desktop only) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-4 text-lg">
          {lists}
        </ul>
      </div>

      {/* Right Side (Cart + Login) */}
      <div className="navbar-end flex items-center gap-4">
        {/* Cart */}
        <Link to="/cart" className="relative">
          <ShoppingCart size={24} />
          <span className="absolute -top-2 -right-2 bg-secondary text-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            2
          </span>
        </Link>

        {/* Login/Register */}
        <Link
          to="/login"
          className="btn btn-secondary text-primary font-semibold"
        >
          <User size={18} className="mr-1" />
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
