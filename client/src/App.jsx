import React from "react";
import './index.css';
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import ThemeLayout from "./components/ThemeLayout";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import AdminStudents from "./pages/AdminStudents";
import AdminTeachers from "./pages/AdminTeachers";
import AdminCreateStudent from "./pages/AdminCreateStudent";
import AdminCreateTeacher from "./pages/AdminCreateTeacher";
import AdminReports from "./pages/AdminReports";
import AdminSettings from "./pages/AdminSettings";
import AdminClasses from "./pages/AdminClasses";
import TeacherPage from "./pages/TeacherPage";
import TeacherAttendance from "./pages/TeacherAttendance";
import NotFoundPage from "./pages/NotFoundPage";
import StudentPage from "./pages/StudentPage";
import StudentAttendance from "./pages/StudentAttendance";
import LoginPage from "./pages/LoginPage";
import AdminSchedule from "./pages/AdminSchedule";
import StudentSyllabus from "./pages/StudentSyllabus";
import StudentSchedule from "./pages/StudentSchedule";
import StudentProfile from "./pages/StudentProfile";
import TeacherClasses from "./pages/TeacherClasses";
import TeacherReport from "./pages/TeacherReport";

function App() {
  return (
    <Router>
      <ThemeLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin"  element={<AdminPage />}>
        
            <Route path="students" element={<AdminStudents />} />
            <Route path="teachers" element={<AdminTeachers />} />
            <Route path="classes" element={<AdminClasses />} />
            <Route path="add-student" element={<AdminCreateStudent />} />
            <Route path="add-teacher" element={<AdminCreateTeacher />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="schedule" element={<AdminSchedule />} />
          </Route>
          <Route path="/teacher" element={<TeacherPage />}>
            <Route path="attendance" element={<TeacherAttendance />} />
            <Route path="classes" element={<TeacherClasses/>} />
            <Route path="report" element={<TeacherReport />} />
            <Route path="settings" element={<div>Settings</div>} />
          </Route>
          <Route path="/student" element={<StudentPage />} >
            <Route path="attendance" element={<StudentAttendance />} />\
            <Route path="syllabus" element={<StudentSyllabus />} />
            <Route path="schedule" element={<StudentSchedule />} />
            <Route path="profile" element={<StudentProfile /> }/>
            <Route path="settings" element={<div>Settings</div>} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ThemeLayout>
    </Router>
  );
}

export default App;
