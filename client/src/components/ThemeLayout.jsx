import React from "react";
import Navbar from "./Navbar";

const ThemeLayout = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
    <Navbar />
    <main className="pt-20">{children}</main>
  </div>
);

export default ThemeLayout;
