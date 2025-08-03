
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const attendanceController = require('../controllers/attendanceController');

/**
 * @swagger
 * /api/admin/students:
 *   get:
 *     summary: Get list of students (paginated)
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of students
 */
router.get('/students', auth, role(['admin']), adminController.getStudents);

/**
 * @swagger
 * /api/admin/students:
 *   post:
 *     summary: Create a new student
 *     tags: [Admin]
 *     requestBody:
router.get('/classes', auth, adminController.getClasses);
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               studentProfile:
 *                 type: object
 *     responses:
 *       201:
 *         description: Student created
 *       409:
 *         description: Email already exists
 */
router.post('/students', auth, role(['admin']), adminController.createStudent);
// Teacher: Take attendance for assigned class
router.post('/teacher/attendance', auth, role(['teacher']), attendanceController.takeAttendance);

/**
 * @swagger
 * /api/admin/teachers:
router.post('/classes', auth, adminController.createClass);
 *     summary: Get list of teachers (paginated)
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of teachers
 */
router.get('/teachers', auth, role(['admin']), adminController.getTeachers);

/**
 * @swagger
 * /api/admin/teachers:
 *   post:
 *     summary: Create a new teacher
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               teacherProfile:
 *                 type: object
 *     responses:
 *       201:
 *         description: Teacher created
 *       409:
 *         description: Email already exists
 */
router.post('/teachers', auth, role(['admin']), adminController.createTeacher);

/**
 * @swagger
 * /api/admin/classes:
 *   get:
 *     summary: Get list of classes
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of classes
 *       401:
 *         description: Unauthorized
 */
router.get('/classes', auth, role(['admin']), adminController.getClasses);

module.exports = router;
/**
 * @swagger
 * /api/admin/classes:
 *   post:
 *     summary: Create a new class
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               section:
 *                 type: string
 *     responses:
 *       201:
 *         description: Class created
 *       409:
 *         description: Class already exists
 */
router.post('/classes', auth, role(['admin']), adminController.createClass);
/**
 * @swagger
 * /api/admin/classes/{classId}/assign-teacher:
 *   post:
 *     summary: Assign a teacher to a class
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teacherId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Teacher assigned
 *       400:
 *         description: Bad request
 *       404:
 *         description: Class or teacher not found
 */
router.post('/classes/:classId/assign-teacher', auth, role(['admin']), adminController.assignTeacherToClass);