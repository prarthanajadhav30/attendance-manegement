import React from "react";

// Schedule Data
const schedule = [
  { day: "Monday", periods: ["Maths", "Programming in C", "Break", "Electronics", "DBMS"] },
  { day: "Tuesday", periods: ["DBMS", "Electronics", "Programming in C", "Maths", "Computer Lab"] },
  { day: "Wednesday", periods: ["Computer Lab", "Maths", "Programming in C", "DBMS", "Electronics"] },
  { day: "Thursday", periods: ["Programming in C", "Maths", "DBMS", "Electronics", "Computer Lab"] },
  { day: "Friday", periods: ["DBMS", "Computer Lab", "Maths", "Programming in C", "Electronics"] },
  { day: "Saturday", periods: ["Project Work", "Computer Lab", "Seminar", "-", "-"] },
];

const StudentSchedule = () => {
  const styles = {
    page: { padding: "20px", color: "black" },
    title: { textAlign: "center", marginBottom: "20px", fontSize: "30px", color: "rgb(25,76,172)" },
    table: { width: "100%", borderCollapse: "collapse", marginTop: "10px" },
    thtd: { border: "1px solid #ddd", padding: "10px", textAlign: "center" },
    thSchedule: { backgroundColor: "#09a579", border: "1px solid #ffffff", padding: "10px", textAlign: "center", color: "white" },
  };

  return (
    <div style={styles.page}>
      {/* Schedule Section */}
      <h2 style={styles.title}>Weekly Class Schedule</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.thSchedule}>Day</th>
            <th style={styles.thSchedule}>9:00-10:00</th>
            <th style={styles.thSchedule}>10:00-11:00</th>
            <th style={styles.thSchedule}>11:00-12:00</th>
            <th style={styles.thSchedule}>12:00-1:00</th>
            <th style={styles.thSchedule}>2:00-3:00</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((row, index) => (
            <tr key={index}>
              <td style={styles.thtd}>{row.day}</td>
              {row.periods.map((period, i) => (
                <td key={i} style={styles.thtd}>{period}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentSchedule;
