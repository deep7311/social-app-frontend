import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FaLink } from "react-icons/fa"; // Icon for logo

const Header = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo and App Name */}
        <Link to="/" className="flex items-center gap-2">
          <FaLink className="text-teal-400 text-2xl drop-shadow-sm" />
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-widest drop-shadow-md">
            Connectify
          </h1>
        </Link>

        {/* Login/Logout Button */}
        {user ? (
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium hover:from-pink-500 hover:to-rose-500 transition-all duration-300 shadow-lg shadow-rose-400/30"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-medium hover:from-indigo-500 hover:to-sky-500 transition-all duration-300 shadow-lg shadow-indigo-400/30"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
