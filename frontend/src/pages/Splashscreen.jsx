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
    <div className="h-screen w-full flex items-center justify-center bg-white">
      
      <div className="text-center">
        
        {/* Logo */}
        <img
          src="/logo.png"
          alt="Money Mate Logo"
          className="w-48 mx-auto mb-6"
        />

       
        <h1 className="text-3xl font-semibold text-gray-700 tracking-wide">
          Money Mate
        </h1>

      </div>

    </div>
  );
}