/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/3 mb-6 md:mb-0"
          >
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="mb-2">Email: chanyalew21@gmail.com</p>
            <p className="mb-2">Phone: +251 948 792247</p>
            <p>Address: Gambi street, Bahirdar, Ethiopia</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/3 mb-6 md:mb-0"
          >
            <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f text-2xl hover:text-blue-500 transition duration-300"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter text-2xl hover:text-blue-400 transition duration-300"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram text-2xl hover:text-pink-500 transition duration-300"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in text-2xl hover:text-blue-700 transition duration-300"></i>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/3"
          >
            <h2 className="text-2xl font-bold mb-4">Location</h2>
            <p>Gambi Street, Bahirdar, Ethiopia</p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.9999999999995!2d37.3833!3d11.6000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8f9e0b0b0b0b%3A0x0!2sBahirdar%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1614311234567!5m2!1sen!2sus"
              width="100%"
              height="150"
              //frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 text-center"
        >
          <p>&copy; {new Date().getFullYear()} WCAD. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
