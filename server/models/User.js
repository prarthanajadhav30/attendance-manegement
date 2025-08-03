const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'teacher', 'student'], required: true },
  studentProfile: {
    class: [
      new mongoose.Schema({
        classId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Class',
        },
        section: { type: String },
      }, { _id: false })
    ],
    rollNumber: Number,
  },
  teacherProfile: {
    subjects: [String],
    class: [
      new mongoose.Schema({
        classId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Class',
        },
        section: { type: String },
      }, { _id: false })
    ],
  },
});

module.exports = mongoose.model('User', userSchema);
