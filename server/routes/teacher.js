const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

/**
 * @swagger
 * /api/teacher/classes:
 *   get:
 *     summary: Get classes assigned to the teacher
 *     tags: [Teacher]
 *     responses:
 *       200:
 *         description: List of classes
 */
router.get('/classes', auth, role(['teacher']), teacherController.getClasses);

/**
 * @swagger
 * /api/teacher/attendance:
 *   post:
 *     summary: Mark attendance for a class
 *     tags: [Teacher]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *               class:
 *                 type: string
 *               subject:
 *                 type: string
 *               students:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     studentId:
 *                       type: string
 *                     status:
 *                       type: string
 *                       enum: [present, absent]
 *     responses:
 *       201:
 *         description: Attendance marked
 */
router.post('/attendance', auth, role(['teacher']), teacherController.createAttendance);

/**
 * @swagger
 * /api/teacher/attendance/class/{classId}:
 *   get:
 *     summary: Get attendance records for a class
 *     tags: [Teacher]
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attendance records
 */
router.get('/attendance/class/:classId', auth, role(['teacher']), teacherController.getAttendanceByClass);

/**
 * @swagger
 * /api/teacher/classes/{classId}/students:
 *   get:
 *     summary: Get students for a specific class
 *     tags: [Teacher]
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of students
 */
router.get('/classes/:classId/students', auth, role(['teacher']), teacherController.getStudentsInClass);

/**
 * @swagger
 * /api/teacher/classes/{classId}/attendance:
 *   post:
 *     summary: Mark attendance for a class on a specific date
 *     tags: [Teacher]
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: attendance
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             date:
 *               type: string
 *             attendance:
 *               type: object
 *     responses:
 *       201:
 *         description: Attendance marked successfully
 */
router.post('/classes/:classId/attendance', auth, role(['teacher']), teacherController.markAttendance);

// Add a route to fetch attendance for a specific class and date
router.get('/classes/:classId/attendance', auth, role(['teacher']), teacherController.getAttendanceByClassAndDate);

module.exports = router;
