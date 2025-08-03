import React, { useEffect, useState } from "react";
import AdminCreateClass from "./AdminCreateClass";
import AdminAssignTeacher from "./AdminAssignTeacher";
import ListingTable from "../components/ListingTable";

const AdminClasses = () => {
  const [classes, setClasses] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchClasses = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/classes", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to fetch classes");
      setClasses(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!showAdd && !showAssign) fetchClasses();
  }, [showAdd, showAssign]);

  const fetchTeachers = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/admin/teachers?page=1&limit=100", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.success) setTeachers(data.data.teachers);
    else setTeachers([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white/80 rounded-xl shadow-lg relative">
      <h2 className="text-2xl font-bold text-pink-700 mb-4 flex justify-between items-center">
        Classes
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow hover:scale-105 transition"
            onClick={() => setShowAdd(true)}
          >Add Class</button>
          <button
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow hover:scale-105 transition"
            onClick={() => { fetchTeachers(); setShowAssign(true); }}
          >Assign Teacher</button>
        </div>
      </h2>
      {showAdd && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 relative w-full max-w-lg">
            <button
              className="absolute top-2 right-2 text-xl text-gray-500 hover:text-pink-600"
              onClick={() => setShowAdd(false)}
            >×</button>
            <AdminCreateClass onClose={() => setShowAdd(false)} onCreated={fetchClasses} />
          </div>
        </div>
      )}
      {showAssign && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 relative w-full max-w-lg">
            <button
              className="absolute top-2 right-2 text-xl text-gray-500 hover:text-pink-600"
              onClick={() => setShowAssign(false)}
            >×</button>
            <AdminAssignTeacher
              classes={classes}
              teachers={teachers}
              onAssign={fetchClasses}
              onClose={() => setShowAssign(false)}
            />
          </div>
        </div>
      )}
      <ListingTable
        columns={[
          { key: "name", label: "Name" },
          { key: "section", label: "Section" },
          { key: "teacher", label: "Assigned Teacher", render: cls =>
            cls.teacher && cls.teacher.name
              ? `${cls.teacher.name} (${cls.teacher.email})`
              : <span className="text-gray-400">Unassigned</span>
          },
        ]}
        data={classes}
        loading={loading}
        error={error}
        emptyText="No classes found."
      />
    </div>
  );
};

export default AdminClasses;
