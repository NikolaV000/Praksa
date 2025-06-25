const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT and attach user to request
exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('AUTH HEADER:', req.headers);

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Middleware to allow only Admins
exports.requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Middleware to allow only Guests
exports.requireGuest = (req, res, next) => {
  if (req.user.role !== 'guest') {
    return res.status(403).json({ message: 'Guest access required' });
  }
  next();
};

