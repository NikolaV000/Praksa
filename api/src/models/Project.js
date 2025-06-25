const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  userId:String
});

module.exports = mongoose.model('Project', ProjectSchema);