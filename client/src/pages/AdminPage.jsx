import { Outlet, useLocation } from "react-router-dom";
import RoleLayout from "../components/RoleLayout";

const AdminPage = () => {
  const location = useLocation();
  // Only show dashboard if path is exactly /admin
  const isDashboard = location.pathname === "/admin";
  return (
    <RoleLayout role="admin">
      {isDashboard && (
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-pink-700 mb-6">Admin Dashboard</h1>
          <div className="w-full max-w-2xl bg-white/80 rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold mb-4">Manage Students & Teachers</h2>
            <ul className="list-disc pl-5 text-gray-700 mb-4">
              <li>Add/Edit/Delete Students</li>
              <li>Add/Edit/Delete Teachers</li>
              <li>Assign students to classes</li>
              <li>View attendance reports</li>
              <li>Manage user credentials</li>
            </ul>
            <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow hover:scale-105 transition">View Reports</button>
          </div>
        </div>
      )}
      <Outlet />
    </RoleLayout>
  );
};

export default AdminPage;
