const Attendance = require('../models/Attendance');

class StudentController {
  async getStudentAttendance(req, res) {
    try {
      const studentId = req.user.id;
      const records = await Attendance.find({ 'students.studentId': studentId })
        .populate('class', 'name section');
      res.status(200).json({ success: true, data: records });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getAttendanceSummary(req, res) {
    try {
      const studentId = req.user.id;
      const records = await Attendance.find({ 'students.studentId': studentId });
      let present = 0, total = 0;
      const monthly = {};
      records.forEach((rec) => {
        const studentRec = rec.students.find(s => s.studentId.toString() === studentId);
        if (studentRec) {
          total++;
          if (studentRec.status === 'present') present++;
          const month = rec.date.toISOString().slice(0, 7); // 'YYYY-MM'
          if (!monthly[month]) monthly[month] = { present: 0, total: 0 };
          monthly[month].total++;
          if (studentRec.status === 'present') monthly[month].present++;
        }
      });
      res.status(200).json({ success: true, data: { percentage: total ? (present / total * 100).toFixed(2) : 0, monthly } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new StudentController();
