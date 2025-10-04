import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { FaTruck, FaTshirt, FaHandshake } from "react-icons/fa";
import ZaffroLogo from "../../logo/ZaffroLogo";

const About = () => {
  return (
    <div className="min-h-screen bg-base-100 text-neutral">

      {/* Hero Section */}
      <section className="relative bg-white text-black py-20 px-5 md:px-20 flex flex-col md:flex-row items-center gap-10 overflow-hidden">
        {/* Text */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Welcome to Zaffro
          </h1>
          <h2 className="text-2xl md:text-3xl text-accent mb-6">
            <Typewriter
              words={['Premium Apparel', 'Trendy Hoodies', 'Stylish T-Shirts']}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </h2>
          <p className="text-lg md:text-xl mb-6 leading-relaxed">
            At Zaffro, we bring you premium apparel that combines style, comfort, and quality. 
            Our mission is to make fashion accessible and effortless for everyone.
          </p>
          <p className="text-lg md:text-xl mb-6 leading-relaxed">
            From trendy hoodies to classic T-shirts, every product is crafted to perfection. 
            Join our community and redefine your style with confidence.
          </p>
          <Link
            to="/products"
            className="btn btn-primary text-white font-bold px-8 py-3 hover:bg-accent transition"
          >
            Explore Products
          </Link>
        </motion.div>

        {/* Image */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
         <ZaffroLogo/>
        </motion.div>
      </section>

      {/* Features / Highlights */}
      <section className="py-20 px-5 md:px-20 bg-base-200">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">Why Choose Zaffro?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div 
            className="bg-white text-black p-8 rounded-2xl shadow-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <FaTshirt size={50} className="mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-semibold mb-2">Premium Quality</h3>
            <p>High-quality fabrics ensure comfort, durability, and style in every product.</p>
          </motion.div>
          <motion.div 
            className="bg-white text-black p-8 rounded-2xl shadow-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <FaTruck size={50} className="mx-auto mb-4 text-accent" />
            <h3 className="text-2xl font-semibold mb-2">Fast & Reliable Delivery</h3>
            <p>Our efficient logistics ensure your orders arrive quickly and safely.</p>
          </motion.div>
          <motion.div 
            className="bg-white text-black p-8 rounded-2xl shadow-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <FaHandshake size={50} className="mx-auto mb-4 text-secondary" />
            <h3 className="text-2xl font-semibold mb-2">Customer Satisfaction</h3>
            <p>We prioritize you with excellent service, support, and hassle-free returns.</p>
          </motion.div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 px-5 md:px-20 bg-green-500 text-secondary text-center rounded-t-xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Join the Zaffro Community</h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Explore our latest collections and discover your perfect style. Fashion has never been this effortless.
        </p>
        <Link
          to="/products"
          className="btn btn-secondary text-white font-bold px-10 py-4 hover:bg-accent transition"
        >
          Explore Products
        </Link>
      </section>

    </div>
  );
};

export default About;
