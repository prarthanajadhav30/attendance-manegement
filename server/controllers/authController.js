const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Class = require('../models/Class');

class AuthController {
  
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ success: false, error: 'User not found' });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ success: false, error: 'Invalid credentials' });
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(200).json({ success: true, data: { token, user: { id: user._id, name: user.name, role: user.role } } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async register(req, res) {
    try {
      const { name, email, password, role, studentProfile, teacherProfile, section } = req.body;

      if (role === 'student' && !section) {
        return res.status(400).json({ success: false, error: 'Section is required for students' });
      }

      const existing = await User.findOne({ email });
      if (existing) return res.status(409).json({ success: false, error: 'Email already exists' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role,
        studentProfile,
        teacherProfile,
        section,
      });

      await user.save();
      res.status(201).json({ success: true, data: { id: user._id, name: user.name, role: user.role } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

 
}

module.exports = new AuthController();
