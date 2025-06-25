const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: false },
  email: String,
  password: String,
  role: { type: String, enum: ['admin', 'guest'], required: true }
});

module.exports = mongoose.model('User', UserSchema);