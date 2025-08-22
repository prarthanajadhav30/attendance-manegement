import React from "react";

const TeacherReport = () => {
  const teacher = {
 
    id: "TCH102",
    department: "Computer Engineering",
    experience: "12 Years",
  };

  const classesHandled = [
    { subject: "Data Structures", semester: "3rd", students: 45 },
    { subject: "OOP (C++)", semester: "3rd", students: 42 },
    { subject: "DBMS", semester: "4th", students: 48 },
    { subject: "Computer Graphics", semester: "4th", students: 40 },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        Teacher Report
      </h2>

      {/* Teacher Info */}
      <div className="mb-6 text-gray-700">
 
        <p><strong>ID:</strong> {teacher.id}</p>
        <p><strong>Department:</strong> {teacher.department}</p>
        <p><strong>Experience:</strong> {teacher.experience}</p>
      </div>

      {/* Classes Report */}
      <table className="w-full border border-gray-300">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-4 py-2">Subject</th>
            <th className="px-4 py-2">Semester</th>
            <th className="px-4 py-2">Students</th>
          </tr>
        </thead>
        <tbody>
          {classesHandled.map((cls, index) => (
            <tr key={index} className="text-center border-t">
              <td className="px-4 py-2">{cls.subject}</td>
              <td className="px-4 py-2">{cls.semester}</td>
              <td className="px-4 py-2">{cls.students}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherReport;
