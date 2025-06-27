// Get DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Load tasks from local storage on page load
window.addEventListener('DOMContentLoaded', loadTasks);

// Add task on button click
addTaskButton.addEventListener('click', addTask);

// Add task on pressing Enter
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    createTaskElement(taskText, false);
    saveTask(taskText, false);
    taskInput.value = "";
}

// Create a task item and append to the list
function createTaskElement(taskText, completed) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;

    const taskName = document.createElement('span');
    taskName.textContent = taskText;
    if (completed) {
        taskName.classList.add('completed');
    }

    checkbox.addEventListener('change', () => {
        taskName.classList.toggle('completed');
        updateLocalStorage();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');

    deleteButton.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        updateLocalStorage();
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskName);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}

// Save task to local storage
function saveTask(taskText, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

// Update local storage after deletion or completion
function updateLocalStorage() {
    const updatedTasks = [];
    document.querySelectorAll('.task-item').forEach(item => {
        const text = item.querySelector('span').textContent;
        const completed = item.querySelector('input').checked;
        updatedTasks.push({ text, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
