import React, { useState } from "react";
import { ReusableForm } from "../components/ReusableForm";

const AdminAssignTeacher = ({ classes, teachers, onAssign, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fields = [
    {
      name: "classId",
      label: "Class/Section",
      type: "select",
      required: true,
      options: classes.map(cls => ({ value: cls._id, label: `${cls.name} (${cls.section})` })),
      placeholder: "-- Select Class --",
    },
    {
      name: "teacherId",
      label: "Teacher",
      type: "select",
      required: true,
      options: teachers.map(teacher => ({ value: teacher._id, label: `${teacher.name} (${teacher.email})` })),
      placeholder: "-- Select Teacher --",
    },
  ];

  const handleAssign = async (values) => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/admin/classes/${values.classId}/assign-teacher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ teacherId: values.teacherId }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to assign teacher");
      if (onAssign) onAssign();
      if (onClose) onClose();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Assign Teacher to Class</h2>
      <ReusableForm
        fields={fields}
        onSubmit={handleAssign}
        submitLabel="Assign"
        loading={loading}
        error={error}
        onCancel={onClose}
      />
    </div>
  );
};

export default AdminAssignTeacher;
