import React from "react";
import RoleCard from "./RoleCard";

const roles = [
  {
    name: "Admin",
    icon: "👤",
    features: [
      "Add/Edit/Delete Students",
      "Add/Edit/Delete Teachers",
      "Assign students to classes",
      "View attendance reports",
      "Manage user credentials",
    ],
    color: "from-pink-500 to-purple-500",
  },
  {
    name: "Teacher",
    icon: "👩‍🏫",
    features: [
      "Take daily attendance",
      "View/edit past attendance records",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Student",
    icon: "👨‍🎓",
    features: [
      "Login to view attendance",
      "Check attendance percentage",
    ],
    color: "from-green-400 to-teal-400",
  },
];

const Dashboard = () => (
  <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
    {roles.map((role) => (
      <RoleCard key={role.name} role={role} />
    ))}
  </section>
);

export default Dashboard;
