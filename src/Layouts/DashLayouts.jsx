import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { Home, Package, ShoppingCart, Users, Menu, X, Plus } from "lucide-react";
import ZaffroLogo from "../logo/ZaffroLogo";

const DashLayouts = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/dashboard", label: "Overview", icon: <Home size={18} /> },
    {
      to: "/dashboard/manage-products",
      label: "Products",
      icon: <Package size={18} />,
    },
    {
      to: "/dashboard/orders",
      label: "Orders",
      icon: <ShoppingCart size={18} />,
    },
    {
      to: "/dashboard/manage-users",
      label: "Users",
      icon: <Users size={18} />,
    },
    {
      to: "/dashboard/add-product",
      label: "Add Product",
      icon: <Plus size={18} />,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral text-gray-200 flex flex-col">
      {/* Top Navigation Bar */}
      <div className="w-full border-b border-gray-700 bg-base-100 py-3 px-6 flex items-center justify-between">
        
        <ZaffroLogo/>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/*  Main Grid Layout */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:flex w-1/4 max-w-xs bg-base-100 border-r border-gray-700 p-6 flex-col justify-between">
          <nav className="space-y-4">
            <h3 className="uppercase text-sm font-semibold text-gray-900 mb-3">
              Dashboard Menu
            </h3>

            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-gray-800 text-white"
                      : "bg-base-300 text-black hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-700 pt-4 text-sm text-gray-700">
            © {new Date().getFullYear()} Zaffro
          </div>
        </aside>

        {/* Divider (Middle Line) */}
        <div className="w-px bg-gray-700 hidden md:block"></div>

        {/* Right Main Content */}
        <main className="flex-1 bg-base-200 p-6 overflow-y-auto">
          <Outlet />
        </main>

        {/* Mobile Sidebar (Slide-in Menu) */}
        <div
          className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setIsMenuOpen(false)}
        ></div>

        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-base-100 border-r border-gray-700 p-6 z-50 transform transition-transform duration-300 md:hidden ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <ZaffroLogo className="h-8 w-8" />
              <span className="font-bold text-lg tracking-wide text-white">
                Zaffro
              </span>
            </Link>
            <button className="text-white" onClick={() => setIsMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-gray-800 text-white"
                      : "bg-base-300 text-black hover:bg-gray-800 hover:text-white"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  );
};

export default DashLayouts;
