const Project = require('../models/Project');
const Task = require('../models/Task');
const mongoose = require('mongoose');

exports.getProject = async (req, res) => {
  const project = await Project.find();
  res.json(project);
};

exports.createProject = async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.status(201).json(project);
};


exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedProject) return res.status(404).send('Task not found');
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
};



exports.deleteProject = async (req, res) => {
try {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid project ID' });
  }
  const deletedProject = await Project.findByIdAndDelete({ _id: req.params.id});
  await Task.deleteMany({ projectId: id });


  if (!deletedProject) {
    return res.status(404).json({ message: 'Project not found' });
  }
  res.status(204).send();
  }catch (error) {
    res.status(500).json({ message: error.message });
  }
};
