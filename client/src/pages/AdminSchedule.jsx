import React, { useState } from "react";

const Classes = () => {
  const [schedules, setSchedules] = useState([
    { id: 1, className: "TY", subject: "DSA", date: "2025-09-01", time: "09:30 PM" },
    { id: 2, className: "TY", subject: "JAVA", date: "2025-09-02", time: "11:30 PM" },
    { id: 3, className: "TY", subject: "PYTHON", date: "2025-09-10", time: "12:00 PM" },
    { id: 4, className: "TY", subject: "SOFTWERW", date: "2025-09-10", time: "2:00 PM" },
    { id: 5, className: "TY", subject: "MIC", date: "2025-09-10", time: "4:00 PM" },
    
  ]);

  const [form, setForm] = useState({
    className: "",
    subject: "",
    date: "",
    time: "",
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.className || !form.subject || !form.date || !form.time) {
      alert("All fields are required");
      return;
    }

    if (editId) {
      setSchedules(schedules.map((item) => item.id === editId ? { ...item, ...form } : item));
      setEditId(null);
    } else {
      setSchedules([...schedules, { id: Date.now(), ...form }]);
    }

    setForm({ className: "", subject: "", date: "", time: "" });
  };

  const handleEdit = (id) => {
    const schedule = schedules.find((item) => item.id === id);
    setForm(schedule);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setSchedules(schedules.filter((item) => item.id !== id));
  };

  // ✨ Modern UI Styles
  const styles = {
    container: {
      width: "85%",
      margin: "30px auto",
      textAlign: "center",
      color: "#333",
      fontFamily: "'Segoe UI', sans-serif",
      background: "linear-gradient(to bottom right, #ffe0ec, #e0e7ff)",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
    },
    form: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "20px",
      flexWrap: "wrap",
      gap: "15px"
    },
    input: {
      padding: "10px 12px",
      width: "200px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "1rem"
    },
    addBtn: {
      padding: "10px 18px",
      background: "linear-gradient(to right, #6a11cb, #2575fc)",
      color: "white",
      border: "none",
      cursor: "pointer",
      borderRadius: "8px",
      fontWeight: "bold",
      transition: "0.3s"
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    },
    thtd: {
      border: "1px solid #ddd",
      padding: "12px",
      backgroundColor: "#fefefe",
      fontSize: "0.95rem"
    },
    th: {
      background: "linear-gradient(to right, #c471ed, #f64f59)",
      color: "#fff",
      fontWeight: "bold",
      padding: "12px",
      fontSize: "1rem"
    },
    editBtn: {
      backgroundColor: "#f59e0b",
      color: "white",
      border: "none",
      padding: "6px 12px",
      marginRight: "5px",
      cursor: "pointer",
      borderRadius: "6px"
    },
    deleteBtn: {
      backgroundColor: "#ef4444",
      color: "white",
      border: "none",
      padding: "6px 12px",
      cursor: "pointer",
      borderRadius: "6px"
    }
  };

  return (
    <div style={styles.container}>
      <h2>Admin Class Schedule</h2>

      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="text"
          name="className"
          placeholder="Class Name"
          value={form.className}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
        />
        <button style={styles.addBtn} type="submit">
          {editId ? "Update Schedule" : "Add Schedule"}
        </button>
      </form>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Class</th>
            <th style={styles.th}>Subject</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Time</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((item) => (
            <tr key={item.id}>
              <td style={styles.thtd}>{item.className}</td>
              <td style={styles.thtd}>{item.subject}</td>
              <td style={styles.thtd}>{item.date}</td>
              <td style={styles.thtd}>{item.time}</td>
              <td style={styles.thtd}>
                <button style={styles.editBtn} onClick={() => handleEdit(item.id)}>Edit</button>
                <button style={styles.deleteBtn} onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Classes;
