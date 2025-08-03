import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full pt-24 pb-12 bg-gradient-to-br from-blue-50 to-purple-100 min-h-[40vh] flex flex-col items-center text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">Modern Student Attendance System</h1>
      <p className="text-lg md:text-2xl text-gray-700 mb-6 max-w-2xl">Track, manage, and visualize student attendance with role-based access for Admin, Teacher, and Student. Built with MERN & Tailwind CSS.</p>
      <button
        className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-lg hover:scale-105 transition"
        onClick={() => navigate("/login")}
      >
        Get Started
      </button>
    </div>
  );
};

export default Hero;
