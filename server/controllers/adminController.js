const User = require('../models/User');
const bcrypt = require('bcryptjs');

class AdminController {
  // Admin: Assign teacher to class
  async assignTeacherToClass(req, res) {
    try {
      const Class = require('../models/Class');
      const { classId } = req.params;
      const { teacherId } = req.body;
      const classDoc = await Class.findById(classId);
      if (!classDoc) return res.status(404).json({ success: false, error: 'Class not found' });
      const teacher = await User.findById(teacherId);
      if (!teacher || teacher.role !== 'teacher') return res.status(404).json({ success: false, error: 'Teacher not found' });
      // Add class and section to teacherProfile.class array if not present
      if (!teacher.teacherProfile) teacher.teacherProfile = {};
      if (!Array.isArray(teacher.teacherProfile.class)) teacher.teacherProfile.class = [];
      const alreadyAssigned = teacher.teacherProfile.class.some(
        (c) => c.classId?.toString() === classId
      );
      if (!alreadyAssigned) {
        teacher.teacherProfile.class.push({ classId, section: classDoc.section });
        await teacher.save();
      }
      // Optionally, add teacher to classDoc (if you want to store teacher in class)
      classDoc.teacher = teacherId;
      await classDoc.save();
      res.status(200).json({ success: true, message: 'Teacher assigned to class', data: { class: classDoc, teacher } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
  // Admin: Get all classes
  async getClasses(req, res) {
    try {
      const Class = require('../models/Class');
      const classes = await Class.find().populate({
        path: 'teacher',
        select: 'name email',
      });
      // Format response to include teacher name/email or 'Unassigned'
      const formatted = classes.map(cls => ({
        _id: cls._id,
        name: cls.name,
        section: cls.section,
        teacher: cls.teacher ? { name: cls.teacher.name, email: cls.teacher.email } : null
      }));
      res.status(200).json({ success: true, data: formatted });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // Admin: Add class
  async createClass(req, res) {
    try {
      const Class = require('../models/Class');
      const { name, section } = req.body;
      const existing = await Class.findOne({ name, section });
      if (existing) return res.status(409).json({ success: false, error: 'Class already exists' });
      const newClass = new Class({ name, section });
      await newClass.save();
      res.status(201).json({ success: true, data: newClass });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
  async getStudents(req, res) {
    try {
      const { page = 1, limit = 10, name } = req.query;
      const query = { role: 'student' };
      if (name) query.name = { $regex: name, $options: 'i' };
      const students = await User.find(query)
        .skip((page - 1) * limit)
        .limit(Number(limit)).populate('studentProfile.class.classId', 'name section');
      const total = await User.countDocuments(query);
      res.status(200).json({ success: true, data: { students, total } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createStudent(req, res) {
    try {
      let { name, email, password, studentProfile } = req.body;
      const { classId, section } = studentProfile;

      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(409).json({ success: false, error: 'Email already exists' });
      }

      const Class = require('../models/Class');
      const classDoc = await Class.findById(classId);
      if (!classDoc) {
        return res.status(404).json({ success: false, error: 'Class not found' });
      }

      password = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email,
        password,
        role: 'student',
        studentProfile: {
          class: [{ classId, section }],
          rollNumber: studentProfile.rollNumber,
        },
      });
      await user.save();

      // Add the student to the class's students array
      classDoc.students = classDoc.students || [];
      classDoc.students.push(user._id);
      await classDoc.save();

      res.status(201).json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getTeachers(req, res) {
    try {
      const { page = 1, limit = 10, name } = req.query;
      const query = { role: 'teacher' };
      if (name) query.name = { $regex: name, $options: 'i' };
      const teachers = await User.find(query)
        .skip((page - 1) * limit)
        .limit(Number(limit));
      const total = await User.countDocuments(query);
      res.status(200).json({ success: true, data: { teachers, total } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createTeacher(req, res) {
    try {
      const { name, email, password, teacherProfile } = req.body;

      if (teacherProfile && teacherProfile.class) {
        if (!Array.isArray(teacherProfile.class)) {
          return res.status(400).json({ success: false, error: 'teacherProfile.class must be an array' });
        }

        for (const entry of teacherProfile.class) {
          if (!entry.classId || !entry.section) {
            return res.status(400).json({ success: false, error: 'Each entry in teacherProfile.class must have classId and section' });
          }
        }
      }

      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(409).json({ success: false, error: 'Email already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword, role: 'teacher', teacherProfile });
      await user.save();
      res.status(201).json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new AdminController();
