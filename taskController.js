const Task = require('./models/task'); // Importa el modelo de tareas

// Obtiene todas las tareas del servidor
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); // Consulta todas las tareas en la base de datos
    res.json(tasks); // Envia las tareas como respuesta en formato JSON
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).json({ error: 'No se pueden obtener las tareas en este momento' });
  }
};

// Agrega una nueva tarea
exports.addTask = async (req, res) => {
  const { name, dueDate, description } = req.body;

  try {
    const newTask = new Task({ name, dueDate, description });
    await newTask.save(); // Guarda la nueva tarea en la base de datos
    res.status(201).json(newTask); // Responde con la tarea creada en formato JSON
  } catch (error) {
    console.error('Error al agregar una tarea:', error);
    res.status(500).json({ error: 'No se puede agregar la tarea en este momento' });
  }
};