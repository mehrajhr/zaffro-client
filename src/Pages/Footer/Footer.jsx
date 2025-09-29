import React from "react";
import ZaffroLogo from "../../logo/ZaffroLogo";
import { Link } from "react-router";
import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-black text-primary-content p-10">
      <aside>
        <ZaffroLogo></ZaffroLogo>
        <p>Copyright © {new Date().getFullYear()} - All right reserved by Zaffro</p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <Link to="https://www.facebook.com/profile.php?id=61578792905281" ><Facebook /></Link>
          <Link to="https://www.instagram.com/_zaffro_/" ><Instagram /></Link>
        </div>
      </nav>

      <p className="inline-block">Developed by <Link className="text-blue-300" to="https://www.facebook.com/profile.php?id=100069445936317">Virtu Minds</Link></p>
    </footer>
  );
};

export default Footer;
