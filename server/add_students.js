const axios = require("axios");

const addStudents = async () => {
  const classId = "688f05b35979d023fcd393db"; // Replace with the actual class ID
  const section = "A"; // Replace with the desired section
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OGYwNTcyNTk3OWQwMjNmY2QzOTNiMyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1NDIwNjI1MiwiZXhwIjoxNzU0MjkyNjUyfQ.ZnTR0LP6NJAwgF4Ejcq3A5MEWFZ_jp6lflGY1aFepUc"; // Replace with the admin token

  for (let i = 1; i <= 100; i++) {
    const studentData = {
      name: `Student ${i}`,
      email: `student${i}@example.com`,
      password: "password123",
      studentProfile: {
        classId,
        section,
        rollNumber: i,
      },
    };

    try {
      const response = await axios.post("http://localhost:5000/api/admin/students", studentData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        console.log(`Student ${i} added successfully.`);
      } else {
        console.error(`Failed to add Student ${i}:`, response.data.error);
      }
    } catch (error) {
      console.error(`Error adding Student ${i}:`, error.message);
    }
  }
};

addStudents();
