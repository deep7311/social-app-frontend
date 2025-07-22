import React from "react";
import { FaShieldAlt, FaHandshake, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#1e1e2f] via-[#2b2d42] to-[#1e1e2f] text-white py-8 mt-16 shadow-inner border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Text */}
        <p className="text-sm text-center md:text-left opacity-80">
          &copy; {new Date().getFullYear()} Connectify by Deepak. All rights
          reserved.
        </p>

        {/* Links with icons */}
        <div className="flex items-center gap-6 mt-3 md:mt-0">
          <a
            href="#"
            className="flex items-center gap-1 text-sm hover:text-teal-300 transition-all duration-300"
          >
            <FaShieldAlt className="text-base" />
            <span>Privacy</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-1 text-sm hover:text-rose-300 transition-all duration-300"
          >
            <FaHandshake className="text-base" />
            <span>Terms</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-1 text-sm hover:text-sky-300 transition-all duration-300"
          >
            <FaEnvelope className="text-base" />
            <span>Contact</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
