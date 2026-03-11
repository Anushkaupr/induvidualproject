import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/users/reset-password-dob", {
        email,
        dob,
        newPassword,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Container - Matches the minimalist white card in your image */}
      <div className="w-full max-w-[420px] bg-white/95 backdrop-blur-sm p-10 rounded-[1.5rem] shadow-xl mx-4">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-8">Reset Password</h2>

        <form onSubmit={handleReset} className="space-y-4">
          
          {/* Email Field */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 ml-1">Email Address</label>
            <input 
              className="w-full px-4 py-3 bg-[#f8f9fa] border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all text-slate-600"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          {/* DOB Field */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 ml-1">Verify Date of Birth</label>
            <input 
              className="w-full px-4 py-3 bg-[#f8f9fa] border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all text-slate-600"
              type="date" 
              placeholder="dd-mm-yyyy"
              value={dob} 
              onChange={(e) => setDob(e.target.value)} 
              required 
            />
          </div>

          {/* New Password Field */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 ml-1">New Password</label>
            <input 
              className="w-full px-4 py-3 bg-[#f8f9fa] border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all text-slate-600"
              type="password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              required 
            />
          </div>

          {/* Update Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#1a73e8] hover:bg-blue-700 text-white py-3 rounded-lg font-bold text-lg shadow-md transition-all active:scale-[0.98] disabled:opacity-70 mt-4"
          >
            {loading ? "Processing..." : "Update Password"}
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <span 
            onClick={() => navigate("/login")}
            className="text-sm font-semibold text-blue-500 hover:underline cursor-pointer transition-colors"
          >
            Back to Login
          </span>
        </div>
      </div>
    </div>
  );
}