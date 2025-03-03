const form = document.getElementById('form');
const input = document.getElementById('q');
const tasks = document.getElementById('tasks');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const taskContainer = document.createElement('div');
  taskContainer.classList.add('task-container');

  const label = document.createElement('label');
  label.classList.add('task-label');

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.id = 'task-checkbox';

  const task = document.createElement('h3');
  task.innerText = input.value;
  task.id = 'task-text';

  label.appendChild(checkBox);
  label.appendChild(task);
  taskContainer.appendChild(label);
  tasks.appendChild(taskContainer);
  tasks.style.display = 'block';

  input.value = '';

  await fetch('/save-task', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: task.innerText })
  });
});

async function loadTasks() {
  const response = await fetch('/get-tasks');
  const task_list = await response.json();
  task_list.forEach(task => {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    const label = document.createElement('label');
    label.classList.add('task-label');

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.id = 'task-checkbox';

    const taskElement = document.createElement('h3');
    taskElement.innerText = task.text;
    taskElement.id = 'task-text';

    label.appendChild(checkBox);
    label.appendChild(taskElement);
    taskContainer.appendChild(label);
    tasks.appendChild(taskContainer);
  });
  if (task_list.length > 0) {
    tasks.style.display = 'block';
  }
}
loadTasks();
