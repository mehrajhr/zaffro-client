import React from "react";
import { Link } from "react-router";

const ZaffroLogo = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center select-none">
      {/* Main ZAFFRO text */}
      <Link to='/'>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold tracking-widest text-secondary">
          ZAFFRO
        </h1>
      </Link>

      {/* SHOP with tapered underlines */}
      <div className="flex items-center gap-1 md:gap-2 md:mt-1">
        {/* Left tapered line */}
        <div className="h-[2px] w-9 md:w-12 bg-gradient-to-l from-secondary to-transparent"></div>

        {/* SHOP text */}
        <span className="text-sm font-serif tracking-[0.2em] text-secondary">
          SHOP
        </span>

        {/* Right tapered line */}
        <div className="h-[2px] w-9 md:w-12 bg-gradient-to-r from-secondary to-transparent"></div>
      </div>
    </div>
  );
};

export default ZaffroLogo;
