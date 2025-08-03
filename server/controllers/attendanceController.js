const User = require('../models/User');
const Attendance = require('../models/Attendance');
const Class = require('../models/Class');

class AttendanceController {
  // Teacher: Take attendance for assigned class
  async takeAttendance(req, res) {
    try {
      const teacherId = req.user._id;
      const { classId, date, students } = req.body; // students: [{ studentId, present }]
      // Check if teacher is assigned to this class
      const teacher = await User.findById(teacherId);
      const assigned = teacher.teacherProfile?.class?.some(
        c => c.classId?.toString() === classId
      );
      if (!assigned) {
        return res.status(403).json({ success: false, error: 'No class assigned or not authorized for this class.' });
      }
      // Proceed to fill attendance
      // ...existing attendance logic...
      res.status(200).json({ success: true, message: 'Attendance filled.' });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new AttendanceController();
