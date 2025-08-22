import React from "react";

const SanikaProfile = () => {
  const student = {
    name: "Sanika Patil",
    rollNo: "102",
    class: "Diploma Computer - Semester 3",
    email: "sanika@example.com",
    profilePic: "https://api.dicebear.com/7.x/initials/svg?seed=Sanika",
    createdAt: new Date().toISOString(),
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-2xl p-6">
      <div className="flex justify-center">
        <img
          src={student.profilePic}
          alt="profile"
          className="w-30 h-20 rounded-full border-4 border-white-400 shadow-md"
        />
      </div>

      <div className="text-center mt-4">
        <h2 className="text-xl font-bold text-gray-800">{student.name}</h2>
        <p className="text-gray-600">Roll No: {student.rollNo}</p>
        <p className="text-gray-600">Class: {student.class}</p>
        <p className="text-gray-600">Email: {student.email}</p>
      </div>

      <div className="mt-3 text-sm text-gray-400 text-center">
        Added on {new Date(student.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default SanikaProfile;
