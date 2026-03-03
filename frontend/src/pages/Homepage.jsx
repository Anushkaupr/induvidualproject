import React from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div 
      className="h-screen w-full flex justify-center items-center relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("image.png")' }}
    >
      {/* LOGO - Positioned top right */}
      <img
        src="/logo.png"
        alt="Money Mate Logo"
        className="absolute top-5 right-8 w-[90px] h-auto cursor-pointer z-10 rounded-lg hover:scale-105 transition-transform"
        onClick={() => navigate("/")}
      />

      {/* CENTER FRAME (Glassmorphism) */}
      <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-md p-10 md:px-12 md:py-16 rounded-[40px] text-center shadow-2xl border border-white/30 max-w-[600px] mx-4">
        
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight uppercase">
          Welcome to <span className="text-blue-600">Money Mate</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 font-medium">
          Manage your expenses and income easily.
        </p>

        {/* BUTTON CONTAINER */}
        <div className="flex flex-col gap-4 items-center w-full">
          <button
            onClick={() => navigate("/login")}
            className="w-full md:w-3/4 bg-blue-600 hover:bg-blue-700 text-white py-4 px-10 rounded-2xl text-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="w-full md:w-3/4 bg-emerald-500 hover:bg-emerald-600 text-white py-4 px-10 rounded-2xl text-xl font-bold shadow-lg shadow-emerald-200 transition-all active:scale-95"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}