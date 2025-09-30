import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebook } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-base-100 text-neutral">

      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20 px-5 md:px-20 text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Contact Us
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Have questions or want to reach out? Here’s how you can contact us. We’re always happy to assist!
        </motion.p>
      </section>

      {/* Contact Info */}
      <section className="py-20 px-5 md:px-20 flex flex-col md:flex-row justify-center items-start gap-16">

        <motion.div
          className="space-y-6 text-center md:text-left max-w-md"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6">Our Contact Information</h2>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <FaPhone className="text-accent" />
            <span>+880 197 987 9095</span>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <FaEnvelope className="text-accent" />
            <span>zaffro2025@gmail.com</span>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <FaMapMarkerAlt className="text-accent" />
            <span>Debpahar, Chittagong, Bangladesh</span>
          </div>

          {/* Social Media */}
          <div className="flex items-center gap-4 mt-4 justify-center md:justify-start">
            <Link to="https://www.facebook.com/profile.php?id=61578792905281" className="text-primary hover:text-accent text-2xl"><FaFacebook /></Link>
            <Link to="https://www.instagram.com/_zaffro_/" className="text-primary hover:text-accent text-2xl"><FaInstagram /></Link>
          </div>
        </motion.div>

        {/* Map Section */}
        <motion.div
          className="w-full md:w-1/2 h-80 rounded-2xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <iframe
            src="https://maps.google.com/maps?q=Debpahar%2C%20Chittagong&t=&z=15&ie=UTF8&iwloc=&output=embed"
            title="Zaffro Location"
            className="w-full h-full"
            allowFullScreen
          ></iframe>
        </motion.div>

      </section>

      {/* CTA Section */}
      <section className="py-20 px-5 md:px-20 bg-accent text-white text-center rounded-tl-3xl rounded-tr-3xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Explore Our Products</h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Discover the latest collections and find your perfect style with Zaffro.
        </p>
        <Link
          to="/products"
          className="btn btn-secondary text-primary font-bold px-10 py-4 hover:bg-primary hover:text-secondary transition"
        >
          Shop Now
        </Link>
      </section>

    </div>
  );
};

export default Contact;
