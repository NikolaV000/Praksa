const express = require('express');
const app = express();
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);


module.exports = app;
