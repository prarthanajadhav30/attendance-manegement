import React, { useState, useEffect } from "react";

const AdminCreateStudent = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [classId, setClassId] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [section, setSection] = useState("");
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch("/api/admin/classes",
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        const data = await res.json();
        if (data.success) setClasses(data.data);
      } catch {
        setError("Failed to fetch classes");
      }
    };
    fetchClasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!classId || !section) {
      setError("Class and Section are required.");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/admin/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          email,
          password,
          studentProfile: { classId, rollNumber, section },
        }),
      });
      const data = await res.json();
      if (!data.success) setError(data.error || "Failed to create student");
      else {
        setSuccess("Student created successfully!");
        if (onSuccess) setTimeout(onSuccess, 800);
      }
    } catch {
      setError("Network error");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-2xl border border-pink-100">
      <h2 className="text-2xl font-extrabold text-pink-600 mb-6 text-center">Add New Student</h2>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required className="px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 bg-pink-50 text-gray-900" />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 bg-pink-50 text-gray-900" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 bg-pink-50 text-gray-900" />
        <select value={classId} onChange={e => setClassId(e.target.value)} required className="px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 bg-pink-50 text-gray-900">
          <option value="" disabled>Select Class</option>
          {classes.map(cls => (
            <option key={cls._id} value={cls._id}>{cls.name} - {cls.section}</option>
          ))}
        </select>
        <input type="number" placeholder="Roll Number" value={rollNumber} onChange={e => setRollNumber(e.target.value)} required className="px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 bg-pink-50 text-gray-900" />
        <input type="text" placeholder="Section" value={section} onChange={e => setSection(e.target.value)} required className="px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 bg-pink-50 text-gray-900" />
        <button type="submit" className="px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-lg hover:scale-105 transition" disabled={loading}>{loading ? "Creating..." : "Add Student"}</button>
      </form>
      {error && <div className="mt-2 text-center text-red-500 font-semibold">{error}</div>}
      {success && <div className="mt-2 text-center text-green-600 font-semibold">{success}</div>}
    </div>
  );
};

export default AdminCreateStudent;
