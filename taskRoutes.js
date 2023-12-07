const express = require('express');
const router = express.Router();
const taskController = require('./taskController');

// Ruta para obtener todas las tareas
router.get('/tasks', taskController.getAllTasks);

// Ruta para agregar una nueva tarea
router.post('/tasks', taskController.addTask);

module.exports = router;