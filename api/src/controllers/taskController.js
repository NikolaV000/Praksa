const Task = require('../models/Task');
const Project = require('../models/Project');
const mongoose = require('mongoose');

// Get all tasks for a specific project
exports.getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const tasks = await Task.find({ projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a task for a specific project
exports.createTask = async (req, res) => {
  console.log('📥 Incoming request body:', req.body); 
  try {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ message: 'Missing or invalid body' });
    }

    const { title, description, status } = req.body;
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    const project = await Project.findById(req.body.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const task = new Task({
      title,
      description,
      status,
      projectId
    });

    await task.save();
    res.status(201).json(task);

  } catch (err) {
    console.error('❌ Error in createTask:', err);
    res.status(500).json({ message: err.message });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a task by ID

 exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
