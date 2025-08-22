import React from "react";

const AttendanceReportsPlaceholder = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📊 Attendance Reports</h1>
      <p style={styles.subtitle}>Track student attendance with detailed reports.</p>

      <div style={styles.box}>
        <h2 style={styles.comingSoon}>🚧 Features Coming Soon!</h2>
        <ul style={styles.featureList}>
          <li>✔️ Attendance Summary per class/student</li>
          <li>📈 Monthly Attendance Charts</li>
          <li>📥 Export to Excel / PDF</li>
          <li>🔍 Advanced Filters & Search</li>
        </ul>
        <p style={styles.note}>Stay tuned! Admin attendance reporting module is under development.</p>
      </div>
    </div>
  );
};

export default AttendanceReportsPlaceholder;

const styles = {
  container: {
    padding: "40px",
    fontFamily: "Segoe UI, sans-serif",
    textAlign: "center",
    backgroundColor: "#f9fafb",
    minHeight: "100vh"
  },
  title: {
    fontSize: "2.5rem",
    color: "#0b1f59",
    marginBottom: "8px"
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#6b7280",
    marginBottom: "30px"
  },
  box: {
    margin: "0 auto",
    padding: "30px",
    maxWidth: "600px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  comingSoon: {
    fontSize: "1.8rem",
    color: "#f97316",
    marginBottom: "20px"
  },
  featureList: {
    textAlign: "left",
    listStyle: "none",
    paddingLeft: "0",
    marginBottom: "20px",
    color: "#374151",
    fontSize: "1rem"
  },
  note: {
    fontStyle: "italic",
    color: "#9ca3af"
  }
};
