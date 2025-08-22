import RoleLayout from "../components/RoleLayout";
import { Outlet, useLocation } from "react-router-dom";

const StudentPage = () => {

    const location = useLocation();

  return (
    <RoleLayout role="student">
        {location.pathname === "/student" && (
            <>
      <h1 className="text-3xl md:text-5xl font-bold text-green-700 mb-6">Student Dashboard</h1>
      <div className="w-full max-w-2xl bg-white/80 rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-4">Attendance Overview</h2>
      <ul className="list-disc pl-5 text-gray-700 mb-4">
        <li>Login to view attendance records</li>
        <li>Check attendance percentage per month or overall</li>
      </ul>
      <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-400 to-teal-400 text-white font-bold shadow hover:scale-105 transition">View Attendance</button>
    </div>
        </>
            )}
        <Outlet />
            
  </RoleLayout>
);

};

export default StudentPage;