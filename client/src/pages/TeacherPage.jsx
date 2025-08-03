import RoleLayout from "../components/RoleLayout";
import { Outlet, useLocation } from "react-router-dom";

const TeacherPage = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/teacher";

  return (
    <RoleLayout role="teacher">
      {isDashboard && (
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-blue-700 mb-6">
            Teacher Dashboard
          </h1>
          <div className="w-full max-w-2xl bg-white/80 rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold mb-4">Attendance Management</h2>
            <ul className="list-disc pl-5 text-gray-700 mb-4">
              <li>Take daily attendance</li>
              <li>View/edit past attendance records</li>
            </ul>
          </div>
        </div>
      )}
      <Outlet />
    </RoleLayout>
  );
};

export default TeacherPage;
