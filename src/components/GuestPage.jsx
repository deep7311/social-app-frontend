import React from "react";
import { Link } from "react-router-dom";

const GuestPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-violet-900 to-black flex items-center justify-center px-4">
      <div className="bg-white/5 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-xl w-full border border-white/20 text-white text-center relative overflow-hidden">

        {/* Glowing Orb Behind */}
        <div className="absolute -top-16 -left-16 w-60 h-60 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-5 tracking-tight">
          Welcome to <span className="text-pink-400">ConnectVerse</span>
        </h1>

        <p className="text-base md:text-lg mb-7 text-white/80 leading-relaxed">
          Step into a connected world — where stories are shared and people connect. Please log in to get started.
        </p>

        <Link to="/login">
          <button className="bg-gradient-to-r from-pink-500 to-violet-600 hover:from-violet-600 hover:to-pink-500 transition duration-300 text-white font-semibold py-2 px-8 rounded-full shadow-lg hover:scale-105">
            Login to Continue
          </button>
        </Link>

        <p className="mt-6 text-sm text-white/60">
          Don’t have an account?{" "}
          <Link to="/register" className="underline text-pink-400 hover:text-violet-300">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default GuestPage;
