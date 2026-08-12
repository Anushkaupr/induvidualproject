import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://induvidualproject-1.onrender.com/api/users/register",
        { username, email, password, dob }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
    
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>

      <div className="relative w-full max-w-[440px] bg-white p-10 rounded-xl shadow-xl mx-4">
        
       
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Register</h2>

        <form onSubmit={handleSignup} className="space-y-5">
          
         
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Username</label>
            <input
  type="text"
  placeholder="Enter your username"
  autoComplete="off"
  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-400 text-gray-700 placeholder-gray-500"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  required
/>
          </div>

         
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Date-of-Birth</label>
            <div className="relative">
              <input
                className="w-full p-3 bg-[#f3f4f6] border border-gray-200 rounded-lg outline-none focus:border-emerald-500 transition-colors text-gray-500"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              className="w-full p-3 bg-[#f3f4f6] border border-gray-200 rounded-lg outline-none focus:border-emerald-500 transition-colors text-gray-700 placeholder:text-gray-400"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <div className="relative">
             <input
  type={showPassword ? "text" : "password"}
  placeholder="Enter your password"
  autoComplete="new-password"
  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-400 text-gray-700 placeholder-gray-500"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
/>
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </span>
            </div>
          </div>

          {/* Register Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#34d399] hover:bg-[#10b981] text-white py-3.5 rounded-lg font-bold text-lg shadow-sm transition-all disabled:opacity-70 mt-4"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 text-center text-gray-600 text-[13px]">
          Already have an account?{" "}
          <span 
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}