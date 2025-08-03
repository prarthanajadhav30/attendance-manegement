# Student Attendance System (MERN Stack)

A student attendance system built with the MERN stack (MongoDB, Express, React, Node.js) to manage and track daily student attendance with role-based access for **Admin**, **Teacher**, and **Student**.

---

## ✨ Features

### 👤 Admin

- Add/Edit/Delete Students
- Add/Edit/Delete Teachers
- Assign students to classes
- View attendance reports
- Manage user credentials

### 👩‍🏫 Teacher

- Take daily attendance
- View/edit past attendance records

### 👨‍🏫 Student

- Login to view their own attendance records
- Check attendance percentage per month or overall

---

## 📊 Tech Stack

| Layer    | Tech                 |
| -------- | -------------------- |
| Frontend | React.js             |
| Backend  | Node.js + Express    |
| Database | MongoDB              |
| Auth     | JWT (JSON Web Token) |

---

## 🔖 Authentication

- Users login via email/password
- Role-based access using JWT middleware

---

## 📁 Folder Structure (Example)

```
/student-attendance-system
  /server
    /controllers
    /models
    /routes
    /middlewares
    server.js
  /client
    /components
    /pages
    App.js
```

---

## 🗋 Database Schema

### User

```js
{
  _id,
  name,
  email,
  password, // hashed
  role: 'admin' | 'teacher' | 'student',
  studentProfile?: { class: "10A", rollNumber: 23 },
  teacherProfile?: { subjects: ["Math"], class: ["10A"] }
}
```

### Attendance

```js
{
  _id,
  date: '2025-08-02',
  class: '10A',
  subject: 'Math',
  teacherId: ObjectId,
  students: [
    { studentId: ObjectId, status: 'present' | 'absent' }
  ]
}
```

---

## 🌐 API Endpoints

### Auth

- `POST /api/auth/login`

### Admin

- `POST /api/admin/students`
- `GET /api/admin/students`
- `POST /api/admin/teachers`
- `GET /api/admin/teachers`

### Teacher

- `GET /api/teacher/classes`
- `POST /api/attendance`
- `GET /api/attendance/class/:classId?date=...`

### Student

- `GET /api/student/attendance`

---

## 📍 React Calendar Libraries

### 1. **react-calendar** (Best for date picking)

- [npm link](https://www.npmjs.com/package/react-calendar)

```bash
npm install react-calendar
```

```js
import Calendar from 'react-calendar';
<Calendar onChange={setDate} value={date} />
```

### 2. **react-big-calendar** (Best for showing attendance events)

- [npm link](https://www.npmjs.com/package/react-big-calendar)

```bash
npm install react-big-calendar date-fns
```

```js
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
```

### 3. **fullcalendar-react** (Advanced calendar)

- [npm link](https://www.npmjs.com/package/@fullcalendar/react)

```bash
npm install @fullcalendar/react @fullcalendar/daygrid
```

---

## 🔄 Attendance Flow (Teacher)

1. Login to dashboard
2. Select class and date
3. Mark each student Present/Absent
4. Submit and save to database

---

## 📅 Suggested Calendar Usage

| Purpose                      | Library              |
| ---------------------------- | -------------------- |
| Mark attendance per day      | `react-calendar`     |
| View attendance on calendar  | `react-big-calendar` |
| Drag-drop / recurring events | `fullcalendar-react` |

---

## 🚀 Deployment

- Use **Render**, **Railway**, or **Heroku** for backend
- Use **Vercel** or **Netlify** for frontend

---

## 🚫 Security Notes

- Hash passwords using bcrypt
- Validate role access using middleware
- Protect all routes with JWT

---

## 📅 Next Steps

- Scaffold MERN app
- Set up roles & auth
- Choose and integrate calendar component
- Build UI per role
- Deploy and test

---

For help scaffolding the backend or React UI, ask for a starter template.

