import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import ListingTable from "../components/ListingTable";

const StudentAttendance = () => {
  const [summary, setSummary] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const [summaryRes, recordsRes] = await Promise.all([
          fetch("/api/student/attendance/summary", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
          }),
          fetch("/api/student/attendance", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
          }),
        ]);
        const summaryData = await summaryRes.json();
        const recordsData = await recordsRes.json();
        if (!summaryData.success || !recordsData.success) {
          setError(summaryData.error || recordsData.error || "Failed to fetch attendance");
        } else {
          setSummary(summaryData.data);
          setRecords(recordsData.data);
        }
      } catch (err) {
        console.error(err);
        setError("Network error");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading attendance...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white/80 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Attendance Summary</h2>
      <div className="mb-6">
        <div className="text-lg">Overall Attendance: <span className="font-bold text-green-600">{summary.percentage}%</span></div>
        <div className="mt-2">
          <span className="font-semibold">Monthly Breakdown:</span>
          <ul className="list-disc pl-6 mt-2">
            {Object.entries(summary.monthly).map(([month, stats]) => (
              <li key={month}>
                {month}: {stats.present}/{stats.total} present ({((stats.present/stats.total)*100).toFixed(2)}%)
              </li>
            ))}
          </ul>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">Attendance Records</h3>
      <div className="overflow-x-auto">
        <ListingTable
          columns={[
            {
              key: "date",
              label: "Date",
              render: row => format(new Date(row.date), "yyyy-MM-dd"),
            },
            {
              key: "class",
              label: "Class",
              render: row => `${row.class?.name || "-"} (${row.class?.section || "-"})`,
            },
            {
              key: "status",
              label: "Status",
              render: row => `${row.students[0]?.status || "-"}`,
            },
          ]}
          data={records}
          loading={loading}
          error={error}
          emptyText="No attendance records found."
        />
      </div>
    </div>
  );
};

export default StudentAttendance;
