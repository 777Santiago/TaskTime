const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./taskRoutes');

const app = express();

mongoose.connect('mongodb://localhost/tasktime', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
    console.log('Conexión a la base de datos exitosa.');
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }, // Puede ser "user" o "admin"
});

const User = mongoose.model('User', userSchema);

// Define el modelo de datos para tareas
const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dueDate: { type: Date, required: true },
    description: String,
    status: String, // Puede ser "abierto", "atrasado" o "completado"
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Task = mongoose.model('Task', taskSchema);

// Define el modelo de datos para estadísticas
const statsSchema = new mongoose.Schema({
    completedTasks: { type: Number, default: 0 },
    overdueTasks: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Stats = mongoose.model('Stats', statsSchema);

app.use(express.json());

// Usa las rutas de tareas
app.use('/api', taskRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});

