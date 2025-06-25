const express = require('express');
const app = express();
const taskRoutes = require('./routes/taskRoutes');
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
  allowedHeaders: ['Authorization', 'Content-Type'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/tasks', taskRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/auth', authRoutes);


module.exports = app;
