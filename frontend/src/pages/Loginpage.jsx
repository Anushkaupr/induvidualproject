import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });

      const user = res.data.user;
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("username", user.username || user.name || user.email);

      toast.success("Login successful!");

      if (user.role === "user") {
        navigate("/userdashboard");
      } else if (user.role === "admin") {
        navigate("/admindashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="h-screen w-full flex justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("bg.jpg")' }} // Ensure this image exists in your public folder
    >
      {/* Container with exact styling from screenshot */}
      <div className="w-full max-w-[420px] bg-white/95 backdrop-blur-sm p-10 rounded-[1.5rem] shadow-xl mx-4">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-8">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
         <input
  type="email"
  placeholder="Email"
  autoComplete="off"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
  required
/>
          </div>

          {/* Password Input */}
          <div className="relative">
          <input
  type={showPassword ? "text" : "password"}
  placeholder="Password"
  autoComplete="new-password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
  required
/>
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </span>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-start">
            <span 
              className="text-sm font-semibold text-blue-500 hover:underline cursor-pointer"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </span>
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#1a73e8] hover:bg-blue-700 text-white py-3 rounded-lg font-bold text-lg shadow-md transition-all active:scale-[0.98] disabled:opacity-70 mt-4"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Footer Text */}
        <div className="mt-8 text-center text-slate-500 text-sm">
          Don’t have an account?{" "}
          <span 
            className="text-blue-500 font-bold cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
}