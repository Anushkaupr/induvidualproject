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
      className="h-screen w-full flex justify-center items-center bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: 'url("bg.jpg")' }}
    >
      {/* Dark Overlay for better contrast */}
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px]"></div>

      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-md p-10 rounded-[2.5rem] shadow-2xl border border-white/20 mx-4">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-blue-200 mx-auto mb-4">
            <i className="fas fa-lock"></i>
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase">Login</h2>
          <p className="text-slate-500 text-sm mt-2 font-medium">Welcome back to MoneyMate</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
            <input
              className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300"
              type="email"
              placeholder="example@mail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Password</label>
            <div className="relative">
              <input
                className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-blue-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <span 
              className="text-sm font-bold text-blue-600 hover:text-blue-800 cursor-pointer transition-colors"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </span>
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Footer Text */}
        <div className="mt-8 text-center text-slate-600 text-sm font-medium">
          Don’t have an account?{" "}
          <span 
            className="text-blue-600 font-bold cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
}
