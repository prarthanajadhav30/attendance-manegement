import React, { useEffect, useState } from "react";
import AdminCreateStudent from "./AdminCreateStudent";
import ListingTable from "../components/ListingTable";

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (showAdd) return;
    const token = localStorage.getItem("token");
    setLoading(true);
    fetch(`/api/admin/students?page=${page}&limit=${limit}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) setError(data.error || "Failed to fetch students");
        else {
          setStudents(data.data.students);
          setTotal(data.data.total);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Network error");
        setLoading(false);
      });
  }, [page, limit, showAdd]);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white/80 rounded-xl shadow-lg relative">
      <h2 className="text-2xl font-bold text-pink-700 mb-4 flex justify-between items-center">
        Students
        <button
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow hover:scale-105 transition"
          onClick={() => setShowAdd(true)}
        >Add Student</button>
      </h2>
      {showAdd && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 relative w-full max-w-lg">
            <button
              className="absolute top-2 right-2 text-xl text-gray-500 hover:text-pink-600"
              onClick={() => setShowAdd(false)}
            >×</button>
            <AdminCreateStudent onSuccess={() => setShowAdd(false)} />
          </div>
        </div>
      )}
      <ListingTable
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          {
            key: "studentProfile.class",
            label: "Class",
            render: row =>
              row.studentProfile?.class?.map(cls => `${cls.classId?.name} (${cls.classId?.section})`).join(", ") || "-",
          },
          { key: "studentProfile.rollNumber", label: "Roll No.", render: row => row.studentProfile?.rollNumber || "-" },
        ]}
        data={students}
        loading={loading}
        error={error}
        emptyText="No students found."
      />
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-700">Page {page} of {Math.ceil(total/limit)}</span>
        <div className="space-x-2">
          <button
            className="px-3 py-1 rounded bg-pink-500 text-white font-bold disabled:opacity-50"
            onClick={() => setPage(p => Math.max(1, p-1))}
            disabled={page === 1}
          >Prev</button>
          <button
            className="px-3 py-1 rounded bg-pink-500 text-white font-bold disabled:opacity-50"
            onClick={() => setPage(p => p+1)}
            disabled={page >= Math.ceil(total/limit)}
          >Next</button>
        </div>
      </div>
    </div>
  );
};

export default AdminStudents;
