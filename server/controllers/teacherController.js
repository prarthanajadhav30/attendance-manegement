const Attendance = require('../models/Attendance');
const User = require('../models/User');

class TeacherController {
  async getClasses(req, res) {
    try {
      const teacher = await User.findById(req.user.id);
      if (!teacher || teacher.role !== 'teacher') {
        return res.status(404).json({ success: false, error: 'Teacher not found' });
      }
      const assigned = teacher.teacherProfile?.class || [];
      const classIds = assigned.map(c => c.classId);
      const Class = require('../models/Class');
      const classes = await Class.find({ _id: { $in: classIds } });
      res.status(200).json({ success: true, data: classes });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createAttendance(req, res) {
    try {
      const { date, class: className, subject, students } = req.body;
      const attendance = new Attendance({
        date,
        class: className,
        subject,
        teacherId: req.user.id,
        students,
      });
      await attendance.save();
      res.status(201).json({ success: true, data: attendance });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getAttendanceByClass(req, res) {
    try {
      const { classId } = req.params;
      const { date } = req.query;
      const query = { class: classId };
      if (date) query.date = date;
      const records = await Attendance.find(query);
      res.status(200).json({ success: true, data: records });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getStudentsInClass(req, res) {
    try {
      const { classId } = req.params;
      const Class = require('../models/Class');
      const classData = await Class.findById(classId).populate('students');

      if (!classData) {
        return res.status(404).json({ success: false, error: 'Class not found' });
      }

      res.status(200).json({ success: true, data: classData.students });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async markAttendance(req, res) {
    try {
      const { classId } = req.params;
      const { date, attendance } = req.body;

      if (!attendance || !Array.isArray(attendance)) {
        return res.status(400).json({ success: false, error: 'Invalid attendance data' });
      }

      // Validate that all students have a status
      for (const record of attendance) {
        if (!record.studentId || !record.status) {
          return res.status(400).json({ success: false, error: 'Each student must have a studentId and status' });
        }
      }

      const Class = require('../models/Class');
      const classDoc = await Class.findById(classId);
      if (!classDoc) {
        return res.status(404).json({ success: false, error: 'Class not found' });
      }

      const Attendance = require('../models/Attendance');
      const existingRecord = await Attendance.findOne({ class: classId, date });

      if (existingRecord) {
        existingRecord.students = attendance;
        await existingRecord.save();
      } else {
        const newAttendance = new Attendance({ class: classId, date, students: attendance });
        await newAttendance.save();
      }

      res.status(201).json({ success: true, message: 'Attendance marked successfully' });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getAttendanceByClassAndDate(req, res) {
    try {
      const { classId } = req.params;
      const { date } = req.query;

      if (!date) {
        return res.status(400).json({ success: false, error: 'Date is required' });
      }

      // Parse the date and create a range for the entire day
      const startOfDay = new Date(date);
      const endOfDay = new Date(date);
      endOfDay.setUTCHours(23, 59, 59, 999);

      const Attendance = require('../models/Attendance');
      const attendanceRecord = await Attendance.findOne({
        class: classId,
        date: { $gte: startOfDay, $lte: endOfDay },
      });

      if (!attendanceRecord) {
        return res.status(404).json({ success: false, error: 'No attendance record found for the given date' });
      }

      res.status(200).json({ success: true, data: attendanceRecord.students });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new TeacherController();
