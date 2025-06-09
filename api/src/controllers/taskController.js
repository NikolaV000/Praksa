const Task = require('../models/Task');
const mongoose = require('mongoose');

exports.getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
};


exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedTask) return res.status(404).send('Task not found');
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};



exports.deleteTask = async (req, res) => {
try {
  const { id } = req.params;

    
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid task ID' });
  }

  const deletedTask = await Task.findByIdAndDelete({ _id: req.params.id});

  if (!deletedTask) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.status(204).send();
  }catch (error) {
    res.status(500).json({ message: error.message });
  }
};
