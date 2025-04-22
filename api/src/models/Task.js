const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['backlog', 'todo', 'in-progress', 'done'], default: 'backlog' }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);