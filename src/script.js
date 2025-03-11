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

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'X';
  deleteButton.id = 'task-delete';

  const task = document.createElement('h3');
  task.innerText = input.value;
  task.id = 'task-text';

  label.appendChild(checkBox);
  label.appendChild(task);
  taskContainer.appendChild(label);
  taskContainer.appendChild(deleteButton);
  tasks.appendChild(taskContainer);
  tasks.style.display = 'block';

  input.value = '';

  const response = await fetch('/save-task', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: task.innerText })
  });

  const savedTask = await response.json(); 

  deleteButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const response = await fetch(`/delete-task/${savedTask._id}`, {
      method: 'DELETE'
    });   
    if (response.ok) {
      taskContainer.remove();
      if (tasks.children.length === 0) {
        tasks.style.display = 'none';
      };
    } else {
      console.error("Erro ao deletar tarefa do banco.");
    }
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

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'X';
    deleteButton.id = 'task-delete';


    const taskElement = document.createElement('h3');
    taskElement.innerText = task.text;
    taskElement.id = 'task-text';

    deleteButton.addEventListener('click', async (e) => {
      e.preventDefault();
      const response = await fetch(`/delete-task/${task._id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        taskContainer.remove();
        if (tasks.children.length === 0) {
          tasks.style.display = 'none';
        };
      } else {
        console.error("Erro ao deletar tarefa do banco.");
      }
    });

    label.appendChild(checkBox);
    label.appendChild(taskElement);
    taskContainer.appendChild(label);
    taskContainer.appendChild(deleteButton);
    tasks.appendChild(taskContainer);
  });

  if (task_list.length > 0) {
    tasks.style.display = 'block';
  };
}
loadTasks();