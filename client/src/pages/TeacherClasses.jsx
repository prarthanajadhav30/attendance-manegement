import React from "react";

const TeacherClasses = () => {
  const teacher = {
  
    department: "Computer Engineering",
 
  };

  const classes = [
    { day: "Monday", subject: "Data Structures", time: "9:00 AM - 10:00 AM", room: "Lab 1" },
    { day: "Monday", subject: "DBMS", time: "11:00 AM - 12:00 PM", room: "Room 204" },
    { day: "Tuesday", subject: "OOP (C++)", time: "10:00 AM - 11:00 AM", room: "Room 202" },
    { day: "Wednesday", subject: "Computer Graphics", time: "12:00 PM - 1:00 PM", room: "Lab 2" },
    { day: "Friday", subject: "Seminar / Project", time: "2:00 PM - 3:00 PM", room: "Seminar Hall" },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      {/* Teacher Info */}
      <div className="text-center border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold text-pink-600">{teacher.name}</h2>
        <p className="text-gray-600">{teacher.department}</p>
        <p className="text-gray-500">{teacher.email}</p>
      </div>

      {/* Classes Table */}
      <h3 className="text-xl font-semibold mb-3 text-gray-800">Assigned Classes</h3>
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-pink-500 text-white">
          <tr>
            <th className="px-4 py-2">Day</th>
            <th className="px-4 py-2">Subject</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Room</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls, index) => (
            <tr key={index} className="text-center border-t">
              <td className="px-4 py-2">{cls.day}</td>
              <td className="px-4 py-2">{cls.subject}</td>
              <td className="px-4 py-2">{cls.time}</td>
              <td className="px-4 py-2">{cls.room}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherClasses;
