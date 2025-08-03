import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const themeConfig = {
  admin: "bg-gradient-to-br from-pink-50 via-purple-100 to-pink-100",
  teacher: "bg-gradient-to-br from-blue-50 via-cyan-100 to-blue-100",
  student: "bg-gradient-to-br from-green-50 via-teal-100 to-green-100",
};

const RoleLayout = ({ role, children }) => (
  <div className={`min-h-screen w-full flex ${themeConfig[role] || themeConfig.student}`}>
    <Sidebar role={role} />
    <div className="flex-1 flex flex-col">
      <Navbar />
      <main className="p-8 pt-24">{children}</main>
    </div>
  </div>
);

export default RoleLayout;
