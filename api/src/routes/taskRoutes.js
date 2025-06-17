const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');


// Get/Create tasks for project
router.get('/:projectId', taskController.getTasks);
router.post('/:projectId', taskController.createTask);

// Update/Delete a specific task by ID
router.put('/:projectId/:id', taskController.updateTask);
router.delete('/:projectId/:id', taskController.deleteTask);


module.exports = router;