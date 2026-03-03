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
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4" 
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Overlay to make the background look more professional */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>

      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white/20">
        
        {/* Icon & Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-indigo-200 mx-auto mb-4">
            <i className="fas fa-key"></i>
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase">Reset Password</h2>
          <p className="text-slate-500 text-sm mt-2 font-medium">Verify your identity to update password</p>
        </div>

        <form onSubmit={handleReset} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
            <input 
              className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300"
              type="email" 
              placeholder="Enter your email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          {/* DOB Field */}
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Verify Date of Birth</label>
            <input 
              className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-slate-700 uppercase"
              type="date" 
              value={dob} 
              onChange={(e) => setDob(e.target.value)} 
              required 
            />
          </div>

          {/* New Password Field */}
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">New Password</label>
            <input 
              className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300"
              type="password" 
              placeholder="••••••••"
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? "Processing..." : "Update Password"}
          </button>
        </form>

        <button 
          onClick={() => navigate("/login")}
          className="w-full mt-6 text-indigo-600 font-bold text-sm hover:text-indigo-800 transition-colors flex items-center justify-center gap-2"
        >
          <i className="fas fa-arrow-left text-xs"></i>
          Back to Login
        </button>
      </div>
    </div>
  );
}