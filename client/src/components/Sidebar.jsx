import React from "react";
import { Link } from "react-router-dom";

const sidebarConfig = {
  admin: {
    theme: "bg-gradient-to-b from-pink-100 to-purple-200 border-r border-pink-300",
    links: [
      { label: "Dashboard", icon: "🏠", path: "/admin" },
      { label: "Students", icon: "👤", path: "/admin/students" },
      { label: "Teachers", icon: "👩‍🏫", path: "/admin/teachers" },
      { label: "Classes", icon: "🏫", path: "/admin/classes" },
    //   { label: "Reports", icon: "📊", path: "/admin/reports" },
    //   { label: "Settings", icon: "⚙️", path: "/admin/settings" },
    ],
  },
  teacher: {
    theme: "bg-gradient-to-b from-blue-100 to-cyan-200 border-r border-blue-300",
    links: [
      { label: "Dashboard", icon: "🏠", path: "/teacher" },
      { label: "Take Attendance", icon: "📝", path: "/teacher/attendance" },
    //   { label: "Classes", icon: "🏫", path: "/teacher/classes" },
    //   { label: "Reports", icon: "📊", path: "/teacher/reports" },
    //   { label: "Settings", icon: "⚙️", path: "/teacher/settings" },
    ],
  },
  student: {
    theme: "bg-gradient-to-b from-green-100 to-teal-200 border-r border-green-300",
    links: [
      { label: "Dashboard", icon: "🏠", path: "/student" },
      { label: "My Attendance", icon: "📅", path: "/student/attendance" },
    //   { label: "Profile", icon: "👤", path: "/student/profile" },
    //   { label: "Settings", icon: "⚙️", path: "/student/settings" },
    ],
  },
};

const Sidebar = ({ role }) => {
  const config = sidebarConfig[role] || sidebarConfig.student;
  return (
    <aside className={`w-64 min-h-screen p-6 ${config.theme} shadow-xl flex flex-col gap-4`}>
      <div className="text-2xl font-bold mb-8">{role.charAt(0).toUpperCase() + role.slice(1)} Panel</div>
      <nav className="flex flex-col gap-2">
        {config.links.map(link => (
          <Link
            key={link.label}
            to={link.path}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/40 font-medium text-lg transition"
          >
            <span className="text-xl">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
