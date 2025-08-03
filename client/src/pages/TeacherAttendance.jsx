import React, { useEffect, useState } from "react";
import ListingTable from "../components/ListingTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useFetchWithAuth from "../hooks/useFetchWithAuth";
import { format } from "date-fns";

const TeacherAttendance = () => {
    const fetchWithAuth = useFetchWithAuth();

    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchClasses = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await fetchWithAuth("/api/teacher/classes");
                const data = await res.json();
                if (!data.success)
                    throw new Error(data.error || "Failed to fetch classes");
                setClasses(data.data || []);
            } catch (err) {
                setError(
                    err.message.includes("Failed to fetch")
                        ? "Unable to connect to the server. Please try again later."
                        : err.message
                );
            } finally {
                setLoading(false);
            }
        };
        fetchClasses();
    }, [fetchWithAuth]);

    useEffect(() => {
        if (!selectedClass) return;
        const fetchStudents = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await fetchWithAuth(
                    `/api/teacher/classes/${selectedClass._id}/students`
                );
                const data = await res.json();
                if (!data.success)
                    throw new Error(data.error || "Failed to fetch students");
                setStudents(data.data || []);
                setAttendance({});
            } catch (err) {
                setError(
                    err.message.includes("Failed to fetch")
                        ? "Unable to connect to the server. Please try again later."
                        : err.message
                );
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, [selectedClass, fetchWithAuth]);

    useEffect(() => {
        if (!selectedClass || !selectedDate) return;
        const fetchAttendance = async () => {
            setLoading(true);
            setError("");
            try {
                const formattedDate = format(selectedDate, "yyyy-MM-dd");
                const res = await fetchWithAuth(
                    `/api/teacher/classes/${selectedClass._id}/attendance?date=${formattedDate}`
                );
                const data = await res.json();
                if (!data.success)
                    throw new Error(data.error || "Failed to fetch attendance");
                const attendanceMap = (data.data || []).reduce(
                    (map, record) => {
                        map[record.studentId] = record.status === "present";
                        return map;
                    },
                    {}
                );
                setAttendance(attendanceMap);
            } catch (err) {
                setError(
                    err.message.includes("Failed to fetch")
                        ? "Unable to connect to the server. Please try again later."
                        : err.message
                );
            } finally {
                setLoading(false);
            }
        };
        fetchAttendance();
    }, [selectedClass, selectedDate, fetchWithAuth]);

    const handleAttendanceChange = (studentId, present) => {
        setAttendance((prev) => ({ ...prev, [studentId]: present }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError("");
        try {
            const formattedAttendance = students.map((student) => ({
                studentId: student._id,
                status: attendance[student._id] ? "present" : "absent",
            }));
            const res = await fetchWithAuth(
                `/api/teacher/classes/${selectedClass._id}/attendance`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        attendance: formattedAttendance,
                        date: selectedDate,
                    }),
                }
            );
            const data = await res.json();
            if (!data.success)
                throw new Error(data.error || "Failed to mark attendance");
            alert("Attendance marked successfully!");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center">
            <div className="max-w-4xl w-full p-8 bg-white rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
                    Mark Attendance
                </h2>
                {loading && (
                    <div className="p-8 text-center text-blue-500 font-semibold">
                        Loading...
                    </div>
                )}
                {error && (
                    <div className="p-8 text-center text-red-500 font-semibold">
                        {error}
                    </div>
                )}
                {!loading && classes.length === 0 && (
                    <div className="p-8 text-center text-gray-500 text-lg">
                        You are not assigned to any class.
                    </div>
                )}
                {classes.length > 0 && (
                    <>
                        <div className="mb-6 grid grid-cols-4 gap-4">
                            <div>
                                <label className="block mb-2 font-semibold text-lg text-gray-800">
                                    Select Assigned Class:
                                </label>
                                <select
                                    className="w-full bg-blue-50 text-blue-700 px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    value={
                                        selectedClass ? selectedClass._id : ""
                                    }
                                    onChange={(e) => {
                                        const cls = classes.find(
                                            (c) => c._id === e.target.value
                                        );
                                        setSelectedClass(cls);
                                    }}
                                >
                                    <option value="">-- Select --</option>
                                    {classes.map((cls) => (
                                        <option key={cls._id} value={cls._id}>
                                            {cls.name} ({cls.section})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 font-semibold text-lg text-gray-800">
                                    Select Date:
                                </label>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    className="!w-full bg-blue-50 text-blue-700 px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                />
                            </div>
                        </div>
                        <div className="mb-6"></div>
                        {selectedClass && students.length > 0 && (
                            <ListingTable
                                columns={[
                                    { key: "name", label: "Name" },
                                    { key: "rollNumber", label: "Roll No." },
                                    {
                                        key: "attendance",
                                        label: "Present",
                                        render: (row) => (
                                            <input
                                                type="checkbox"
                                                checked={
                                                    attendance[row._id] || false
                                                }
                                                onChange={(e) =>
                                                    handleAttendanceChange(
                                                        row._id,
                                                        e.target.checked
                                                    )
                                                }
                                                className="cursor-pointer focus:ring-2 focus:ring-blue-500"
                                            />
                                        ),
                                    },
                                ]}
                                data={students}
                                loading={loading}
                                error={error}
                                emptyText="No students found."
                            />
                        )}
                        {selectedClass && students.length > 0 && (
                            <button
                                className="mt-6 px-6 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold shadow hover:scale-105 hover:shadow-lg transition duration-200"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                Mark Attendance
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default TeacherAttendance;
