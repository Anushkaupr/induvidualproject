import React from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/image.png')" }}
    >

      
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl text-center w-[420px]">

        
        <h1 className="text-4xl font-bold text-black mb-4">
          Welcome to Money Mate!!
        </h1>

       
        <p className="text-gray-600 mb-8">
          Manage your expenses and income easily.
        </p>

       
        <div className="flex flex-col gap-4">

          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Register
          </button>

        </div>
      </div>

    </div>
  );
}