const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Project = require('../models/Project');
const Task = require('../models/Task');
const mongoose = require('mongoose');

const JWT_SECRET = 'your_secret_key'; 

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Username already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed, role: 'admin' });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
    res.status(201).json({ token, username: user.username, role: user.role, id: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, role: 'admin' });

    if (!user) return res.status(404).json({ message: 'Admin not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
    res.json({ token, username: user.username, role: user.role, id: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.guestSignup = async (req, res) => {
  try {
    const guest = new User({ role: 'guest' });
    await guest.save();

    guest.username = `Guest_${guest._id.toString().slice(-6)}`;
    await guest.save();

    const token = jwt.sign({ id: guest._id, role: guest.role }, JWT_SECRET);
    res.status(201).json({ token, username: guest.username, role: guest.role, id: guest._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteGuest = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid ID' });

    const guest = await User.findOneAndDelete({ _id: id, role: 'guest' });
    if (!guest) return res.status(404).json({ message: 'Guest not found' });

    res.status(200).json({ message: 'Guest deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.validateToken = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ token, username: user.username, role: user.role, id: user._id });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
exports.getAdminData = async (req, res) => {
  try {
    // You already have req.user from the middleware
    const admin = req.user;

    // You can customize this based on what data you want to return
    res.status(200).json({
      message: `Welcome, Admin ${admin.username}`,
      data: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await User.findOneAndDelete({ _id: id, role: 'admin' });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    // Delete all projects and their tasks
    const projects = await Project.find({ userId: id });

    for (const project of projects) {
      await Task.deleteMany({ projectId: project._id });
      await project.deleteOne();
    }

    res.status(200).json({ message: 'Admin and related data deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' }).select('_id username');
    res.json(admins);
  } catch (err) {
    console.error('Error fetching admins:', err);
    res.status(500).json({ message: 'Server error' });
  }
};