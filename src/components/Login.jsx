import axios from "axios";
import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = import.meta.env.VITE_API_URL;

    try {
      const response = await axios.post(`${url}/api/users/login`, data);
      if (response.data.success) {
        toast.success(response.data.message);
        setUser(response.data.user);
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1f1f23] p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-md text-white space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-400">
          Welcome Back
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={data.email}
          onChange={handleInput}
          className="w-full p-3 bg-[#2b2b30] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleInput}
            className="w-full p-3 bg-[#2b2b30] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white/70 hover:text-white"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md text-white font-semibold ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
