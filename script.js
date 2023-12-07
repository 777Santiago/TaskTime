document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            // Envia una solicitud al servidor para verificar las credenciales
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Redirige al usuario a la página de inicio después del inicio de sesión exitoso
                window.location.href = '/home';
            } else {
                // Muestra un mensaje de error si las credenciales son incorrectas
                alert('Inicio de sesión fallido. Verifica tus credenciales.');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    });

    registerForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const newUsername = document.getElementById('new-username').value;
        const email = document.getElementById('email').value;
        const newPassword = document.getElementById('new-password').value;

        try {
            // Envia una solicitud al servidor para registrar un nuevo usuario
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newUsername, email, newPassword }),
            });

            if (response.ok) {
                // Redirige al usuario a la página de inicio después del registro exitoso
                window.location.href = '/home';
            } else {
                // Muestra un mensaje de error si el registro falla (por ejemplo, si el nombre de usuario o el correo ya existen)
                alert('El registro falló. El nombre de usuario o el correo electrónico ya están en uso.');
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const profileInfo = document.getElementById('profile-info');

    // Función para cargar los datos del perfil del usuario desde el servidor
    async function loadProfileInfo() {
        try {
            const response = await fetch('/api/user/profile'); // Solicita los datos del perfil al servidor
            if (response.ok) {
                const userData = await response.json(); // Obtiene los datos del perfil en formato JSON
                displayProfileInfo(userData); // Muestra los datos del perfil en la página
            } else {
                console.error('Error al cargar datos del perfil desde el servidor');
            }
        } catch (error) {
            console.error('Error al cargar datos del perfil desde el servidor:', error);
        }
    }

    // Función para mostrar los datos del perfil del usuario en la página
    function displayProfileInfo(userData) {
        profileInfo.innerHTML = `
            <p><strong>Nombre de Usuario:</strong> ${userData.username}</p>
            <p><strong>Correo Electrónico:</strong> ${userData.email}</p>
            <p><strong>Edad:</strong> ${userData.age}</p>
            <p><strong>Tareas Completadas:</strong> ${userData.completedTasks}</p>
            <p><strong>Tareas Atrasadas:</strong> ${userData.overdueTasks}</p>
            <p><strong>Tareas Abiertas:</strong> ${userData.openTasks}</p>
        `;
    }

    // Cargar los datos del perfil del usuario cuando la página se cargue
    loadProfileInfo();
});

document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('task-list');
    const addTaskForm = document.getElementById('add-task-form');

    // Función para cargar las tareas desde el servidor
    async function loadTasks() {
        try {
            const response = await fetch('/api/tasks'); // Solicita las tareas al servidor
            if (response.ok) {
                const tasks = await response.json(); // Obtiene las tareas en formato JSON
                displayTasks(tasks); // Muestra las tareas en la página
            } else {
                console.error('Error al cargar tareas desde el servidor');
            }
        } catch (error) {
            console.error('Error al cargar tareas desde el servidor:', error);
        }
    }

    // Función para mostrar las tareas en la lista
    function displayTasks(tasks) {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `<b>${task.name}</b> - Fecha de entrega: ${task.dueDate}<br>${task.description}`;
            taskList.appendChild(li);
        });
    }

    // Agregar una tarea
    addTaskForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const taskName = document.getElementById('task-name').value;
        const dueDate = document.getElementById('due-date').value;
        const description = document.getElementById('task-description').value;

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: taskName, dueDate, description }),
            });

            if (response.ok) {
                loadTasks(); // Recarga la lista de tareas después de agregar una nueva tarea
                addTaskForm.reset();
            } else {
                console.error('Error al agregar una tarea');
            }
        } catch (error) {
            console.error('Error al agregar una tarea:', error);
        }
    });

    // Cargar las tareas iniciales
    loadTasks();
});

document.addEventListener('DOMContentLoaded', function () {
    const statisticsData = document.getElementById('statistics-data');

    // Función para cargar los datos de estadísticas desde el servidor
    async function loadStatisticsData() {
        try {
            const response = await fetch('/api/statistics'); // Solicita los datos de estadísticas al servidor
            if (response.ok) {
                const statsData = await response.json(); // Obtiene los datos de estadísticas en formato JSON
                displayStatisticsData(statsData); // Muestra los datos de estadísticas en la página
            } else {
                console.error('Error al cargar datos de estadísticas desde el servidor');
            }
        } catch (error) {
            console.error('Error al cargar datos de estadísticas desde el servidor:', error);
        }
    }

    // Función para mostrar los datos de estadísticas en la página
    function displayStatisticsData(statsData) {
        statisticsData.innerHTML = `
            <p><strong>Tareas Completadas:</strong> ${statsData.completedTasks}</p>
            <p><strong>Tareas Atrasadas:</strong> ${statsData.overdueTasks}</p>
            <p><strong>Tareas Abiertas:</strong> ${statsData.openTasks}</p>
            <!-- Puedes agregar más estadísticas aquí -->
        `;
    }

    // Cargar los datos de estadísticas cuando la página se cargue
    loadStatisticsData();
});