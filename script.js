let tasks = [];

const taskList = document.getElementById('task-list');
const addTaskForm = document.getElementById('add-task-form');
const taskInput = document.getElementById('task-input');
const taskDate = document.getElementById('task-date');
const taskTime = document.getElementById('task-time');
const addTaskBtn = document.getElementById('add-task-btn');

addTaskForm.addEventListener('submit', addTask);

function addTask(event) {
    event.preventDefault();
    const task = {
        id: Date.now(),
        title: taskInput.value,
        date: taskDate.value,
        time: taskTime.value,
        completed: false
    };
    tasks.push(task);
    renderTaskList();
    taskInput.value = '';
    taskDate.value = '';
    taskTime.value = '';
}

function renderTaskList() {
    taskList.innerHTML = '';
    tasks.forEach((task) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <span>${task.title}</span>
            <span>${task.date} ${task.time}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        taskList.appendChild(taskItem);
    });
}

taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-btn')) {
        const taskId = event.target.parentNode.id;
        const task = tasks.find((task) => task.id === parseInt(taskId));
        task.title = prompt('Edit task:', task.title);
        renderTaskList();
    } else if (event.target.classList.contains('delete-btn')) {
        const taskId = event.target.parentNode.id;
        tasks = tasks.filter((task) => task.id !== parseInt(taskId));
        renderTaskList();
    }
});

taskList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        const taskId = event.target.id;
        const task = tasks.find((task) => task.id === parseInt(taskId));
        task.completed = !task.completed;
        renderTaskList();
    }
});