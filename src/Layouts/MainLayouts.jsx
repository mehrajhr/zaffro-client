import React from "react";
import { Outlet } from "react-router";
import Footer from "../Pages/Footer/Footer";
import Navbar from "../Pages/Navbar/Navbar";

const MainLayouts = () => {
  return (
    <div>
      <header className="bg-neutral fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto md:px-10">
            <Navbar></Navbar>
        </div>
      </header>
      <main className="max-w-7xl mx-auto md:px-10 pt-20">
        <Outlet></Outlet>
      </main>
      <footer className="bg-black">
        <div className="max-w-7xl mx-auto md:px-10">
            <Footer></Footer>
        </div>
      </footer>
    </div>
  );
};

export default MainLayouts;
