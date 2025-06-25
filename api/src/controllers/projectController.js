const Project = require('../models/Project');
const Task = require('../models/Task');
const mongoose = require('mongoose');

exports.getProject = async (req, res) => {


  try {
    const { userId } = req.params;
    let projects;
    if (userId) {
      projects = await Project.find({ userId }); // Replace 'admin' with actual field name
    } else {
      projects = await Project.find(); // fallback or restrict based on role
    }

    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};

exports.createProject = async (req, res) => {
  const { name} = req.body;
  const { userId } = req.params;
  const project = new Project({
      name,
      userId
    });
  await project.save();
  res.status(201).json(project);
};


exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedProject) return res.status(404).send('Project not found');
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
