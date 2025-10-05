import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { Home, Package, ShoppingCart, Users, Settings } from "lucide-react"; // icons
import ZaffroLogo from "../logo/ZaffroLogo";

const DashLayouts = () => {
  return (
    <div className="min-h-screen bg-neutral text-gray-200 flex flex-col">
      {/* 🔝 Top Navigation Bar */}
      <div className="w-full border-b border-gray-700 bg-base-100 py-3 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <ZaffroLogo className="h-8 w-8" />
          <span className="font-bold text-lg tracking-wide text-white">
            Zaffro Dashboard
          </span>
        </Link>
      </div>

      {/* 🧱 Main Grid Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-1/4 max-w-xs bg-base-100 border-r border-gray-700 p-6 hidden md:flex flex-col justify-between">
          <nav className="space-y-4">
            <h3 className="uppercase text-sm font-semibold text-gray-900 mb-3">
              Dashboard Menu
            </h3>
            <NavLink
              to="/dashboard"
              className="flex bg-base-300 text-black items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition"
            >
              <Home size={18} />
              <span>Overview</span>
            </NavLink>

            <NavLink
              to="/dashboard/manage-products"
              className="flex bg-base-300 text-black items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition"
            >
              <Package size={18} />
              <span>Products</span>
            </NavLink>

            <NavLink
              to="/dashboard/orders"
              className="flex bg-base-300 text-black items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition"
            >
              <ShoppingCart size={18} />
              <span>Orders</span>
            </NavLink>

            <NavLink
              to="/dashboard/manage-users"
              className="flex bg-base-300 text-black items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition"
            >
              <Users size={18} />
              <span>Users</span>
            </NavLink>
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
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
};

export default DashLayouts;
