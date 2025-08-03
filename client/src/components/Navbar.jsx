import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Simulate fetching login status and user role
    const loginStatus = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("userRole");
    setIsLoggedIn(loginStatus === "true");
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-lg shadow-lg fixed top-0 left-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <span className="text-2xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Attendance System</span>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="px-4 py-2 rounded-lg font-semibold text-gray-700 hover:text-blue-600 transition">Home</Link>
          {userRole === "admin" && <Link to="/admin" className="px-4 py-2 rounded-lg font-semibold text-gray-700 hover:text-pink-600 transition">Admin</Link>}
          {userRole === "teacher" && <Link to="/teacher" className="px-4 py-2 rounded-lg font-semibold text-gray-700 hover:text-blue-500 transition">Teacher</Link>}
          {userRole === "student" && <Link to="/student" className="px-4 py-2 rounded-lg font-semibold text-gray-700 hover:text-green-600 transition">Student</Link>}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold shadow hover:scale-105 transition">Logout</button>
          ) : (
            <Link to="/login" className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:scale-105 transition">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
