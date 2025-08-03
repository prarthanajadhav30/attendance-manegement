const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  subject: { type: String },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: { type: String }, // Optional notes for the attendance session
  period: { type: String }, // Optional period/slot info
  students: [
    new mongoose.Schema({
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      status: { type: String, enum: ['present', 'absent'], required: true },
      remarks: { type: String }, // Optional remarks per student
      // Add more fields as needed
    }, { _id: false })
  ],
});

module.exports = mongoose.model('Attendance', attendanceSchema);
