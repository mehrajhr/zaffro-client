import React from "react";

const ZaffroLogo = () => {
  return (
    <div
      className="flex flex-col items-center justify-center text-center select-none"
    >
      {/* Main ZAFFRO text */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold tracking-widest text-yellow-200">
        ZAFFRO
      </h1>

      {/* SHOP with tapered underlines */}
      <div className="flex items-center gap-1 md:gap-2 md:mt-1">
        {/* Left tapered line */}
        <div className="h-[2px] w-9 md:w-12 bg-gradient-to-l from-yellow-200 to-transparent"></div>

        {/* SHOP text */}
        <span className="text-sm font-serif tracking-[0.2em] text-yellow-200">
          SHOP
        </span>

        {/* Right tapered line */}
        <div className="h-[2px] w-9 md:w-12 bg-gradient-to-r from-yellow-200 to-transparent"></div>
      </div>
    </div>
  );
};

export default ZaffroLogo;
