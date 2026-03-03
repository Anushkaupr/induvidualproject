import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/homepage");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full flex justify-center items-center bg-white dark:bg-slate-900 transition-colors duration-500">
      
      {/* Container with a smooth entry animation */}
      <div className="text-center animate-in fade-in zoom-in duration-1000 ease-out">
        
        {/* Logo with a slight pulse to show it's loading */}
        <img
          src="logo.png"
          alt="Money Mate Logo"
          className="w-[180px] h-auto mx-auto drop-shadow-md animate-pulse"
        />
        
        {/* Text with premium styling */}
        <div className="mt-5 text-2xl font-black text-slate-700 dark:text-white tracking-[2px] uppercase">
          Money <span className="text-blue-600">Mate</span>
        </div>

        {/* Optional: Simple Loading Bar */}
        <div className="mt-8 w-48 h-1 bg-slate-100 dark:bg-slate-800 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-blue-600 animate-[loading_2s_ease-in-out]"></div>
        </div>
      </div>

      {/* Tailwind handles standard animations, but for custom progress bars, 
          you can add this one-line global style if needed */}
      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}