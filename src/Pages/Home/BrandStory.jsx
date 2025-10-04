import React from "react";
import ZaffroLogo from "../../logo/ZaffroLogo";
import { Link } from "react-router";

const BrandStory = () => {
  return (
    <section className="bg-base-200 py-16 px-4 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row md:justify-between items-center gap-10">
        {/* Image / Illustration */}
        <ZaffroLogo></ZaffroLogo>

        {/* Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Our Story
          </h2>
          <p className="text-gray-700 text-lg">
            Zaffro was born from a passion for high-quality, stylish, and
            affordable clothing. Our mission is to make fashion accessible to
            everyone while maintaining top-notch quality and attention to
            detail.
          </p>
          <p className="text-gray-800 text-lg">
            Every piece in our collection is carefully crafted, keeping both
            comfort and style in mind. Whether you are looking for casual wear
            or statement pieces, Zaffro has got you covered.
          </p>
          <Link to='/products' className="bg-black text-white px-6 py-3 rounded-lg font-semibold cursor-pointer w-fit">
            Explore Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
