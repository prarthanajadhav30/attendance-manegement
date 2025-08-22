 // SyllabusStu.jsx
import React, { useState } from "react";

const syllabus = {
  "Semester 1": [
    { subject: "Engineering Mathematics-I", hours: 60 },
    { subject: "Fundamentals of Computer & IT", hours: 45 },
    { subject: "Applied Physics / Electronics", hours: 45 },
    { subject: "Communication Skills", hours: 30 },
    { subject: "Ethics / Engineering Drawing", hours: 30 },
  ],
  "Semester 2": [
    { subject: "Engineering Mathematics-II", hours: 60 },
    { subject: "Programming in C", hours: 60 },
    { subject: "Basic Electrical & Electronics", hours: 45 },
    { subject: "Computer Centre Management", hours: 30 },
    { subject: "Communication Skills II", hours: 30 },
  ],
  "Semester 3": [
    { subject: "Data Structures Using C", hours: 60 },
    { subject: "Digital Techniques / Logic Design", hours: 45 },
    { subject: "Object Oriented Programming (C++)", hours: 60 },
    { subject: "Database Management System", hours: 60 },
    { subject: "Computer Graphics", hours: 45 },
  ],
};

const StudentSyllabus = () => {
  const [selectedSemester, setSelectedSemester] = useState("Semester 1");

  return (
    <div style={{ padding: "20px", color: "black" }}>
      <h2 style={{ marginBottom: "15px", textAlign: "center", fontSize: "30px" }}>
        Computer Diploma Syllabus
      </h2>

      {/* Semester Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
        {Object.keys(syllabus).map((sem) => (
          <button
            key={sem}
            onClick={() => setSelectedSemester(sem)}
            style={{
              padding: "8px 16px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              borderRadius: "5px",
              backgroundColor: selectedSemester === sem ? "#82d385ff" : "#589f5bff",
              color: selectedSemester === sem ? "white" : "black",
            }}
          >
            {sem}
          </button>
        ))}
      </div>

      {/* Syllabus Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #090909ff",
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#589f5bff",
                color: "white",
              }}
            >
              Subject
            </th>
            <th
              style={{
                border: "1px solid #111111ff",
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#589f5bff",
                color: "white",
              }}
            >
              Hours
            </th>
          </tr>
        </thead>
        <tbody>
          {syllabus[selectedSemester].map((item, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #131313ff", padding: "10px", textAlign: "center" }}>
                {item.subject}
              </td>
              <td style={{ border: "1px solid #100f0fff", padding: "10px", textAlign: "center" }}>
                {item.hours}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentSyllabus;