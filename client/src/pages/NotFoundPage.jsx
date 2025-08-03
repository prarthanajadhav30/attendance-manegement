import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-purple-100">
    <h1 className="text-5xl font-bold text-purple-700 mb-4">404</h1>
    <p className="text-lg text-gray-700 mb-6">Page not found.</p>
    <Link to="/" className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow hover:scale-105 transition">Go Home</Link>
  </div>
);

export default NotFoundPage;
