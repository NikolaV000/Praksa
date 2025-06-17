const express = require('express');
const app = express();
const taskRoutes = require('./routes/taskRoutes');
const projectRoutes = require('./routes/projectRoutes');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/tasks', taskRoutes);
app.use('/api/project', projectRoutes);


module.exports = app;
