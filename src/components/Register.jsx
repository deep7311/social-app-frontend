import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_API_URL;

  const handleInput = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirm_password) {
      toast.error("Password doesn't match");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/users/register`, data);
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirm_password: "",
        });
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1f1f23] p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-md text-white space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-green-400">
          Create Account
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={data.name}
          onChange={handleInput}
          required
          className="w-full p-3 bg-[#2b2b30] rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleInput}
          required
          className="w-full p-3 bg-[#2b2b30] rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleInput}
            required
            className="w-full p-3 bg-[#2b2b30] rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 pr-10"
          />
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          value={data.confirm_password}
          onChange={handleInput}
          required
          className="w-full p-3 bg-[#2b2b30] rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md text-white font-semibold ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
