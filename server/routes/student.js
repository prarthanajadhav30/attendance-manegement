const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * /api/student/attendance:
 *   get:
 *     summary: Get attendance records for the logged-in student
 *     tags: [Student]
 *     responses:
 *       200:
 *         description: Attendance records
 */
router.get('/attendance', auth, studentController.getStudentAttendance);

/**
 * @swagger
 * /api/student/attendance/summary:
 *   get:
 *     summary: Get attendance summary (percentage, monthly stats) for the logged-in student
 *     tags: [Student]
 *     responses:
 *       200:
 *         description: Attendance summary
 */
router.get('/attendance/summary', auth, studentController.getAttendanceSummary);

module.exports = router;
