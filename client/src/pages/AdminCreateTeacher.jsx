import React, { useState, useEffect } from "react";
import Select from "react-select";

const AdminCreateTeacher = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`/api/admin/classes`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) setError(data.error || "Failed to fetch classes");
        else
          setClasses(
            data.data.map((cls) => ({
              value: cls._id,
              label: `${cls.name} (${cls.section})`,
            }))
          );
      })
      .catch(() => setError("Network error"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/admin/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          email,
          password,
          teacherProfile: {
            class: selectedClasses.map((cls) => ({
              classId: cls.value,
              section: cls.label.split(" (")[1].replace(")", ""),
            })),
          },
        }),
      });
      const data = await res.json();
      if (!data.success) setError(data.error || "Failed to create teacher");
      else {
        setSuccess("Teacher created successfully!");
        if (onSuccess) setTimeout(onSuccess, 800);
      }
    } catch {
      setError("Network error");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white/80 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-pink-700 mb-4">Add New Teacher</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="px-4 py-2 rounded-lg border border-gray-300"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-2 rounded-lg border border-gray-300"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="px-4 py-2 rounded-lg border border-gray-300"
        />
        <div>
          <label className="block mb-2 font-semibold text-lg text-gray-800">
            Select Classes:
          </label>
          <Select
            isMulti
            options={classes}
            value={selectedClasses}
            onChange={setSelectedClasses}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow hover:scale-105 transition"
          disabled={loading}
        >
          {loading ? "Creating..." : "Add Teacher"}
        </button>
      </form>
      {error && <div className="mt-2 text-red-500">{error}</div>}
      {success && <div className="mt-2 text-green-600">{success}</div>}
    </div>
  );
};

export default AdminCreateTeacher;
