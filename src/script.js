const form = document.getElementById('form');
const input = document.getElementById('q');
const todo_tasks = document.getElementById('todo_tasks');
const ex_tasks = document.getElementById('ex_tasks');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const taskContainer = document.createElement('div');
  taskContainer.classList.add('task-container');

  const label = document.createElement('label');
  label.classList.add('task-label');

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.classList.add('task-checkbox');

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'X';
  deleteButton.classList.add('task-delete');

  const task = document.createElement('h3');
  task.innerText = input.value;
  task.classList.add('task-text');

  label.appendChild(checkBox);
  label.appendChild(task);
  taskContainer.appendChild(label);
  taskContainer.appendChild(deleteButton);
  todo_tasks.appendChild(taskContainer);
  todo_tasks.style.display = 'block';
  input.value = '';

  checkBox.addEventListener('change', () => {
    if (checkBox.checked) {
      ex_tasks.appendChild(taskContainer);
    } else {
      todo_tasks.appendChild(taskContainer);
    }
  });

  const response = await fetch('/save-task', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: task.innerText, completed: checkBox.checked })
  });
  const savedTask = await response.json();

  deleteButton.addEventListener('click', async () => {
    const response = await fetch(`/delete-task/${savedTask._id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      taskContainer.remove();
    }
  });

  checkBox.addEventListener('change', async () => {
    await fetch(`/update-task/${savedTask._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: checkBox.checked })
    });

    if (checkBox.checked) {
      ex_tasks.appendChild(taskContainer);
    } else {
      todo_tasks.appendChild(taskContainer);
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
    checkBox.classList.add('task-checkbox');
    checkBox.checked = task.completed;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'X';
    deleteButton.classList.add('task-delete');

    const taskElement = document.createElement('h3');
    taskElement.innerText = task.text;
    taskElement.classList.add('task-text');

    if (task.completed) {
      taskElement.style.textDecoration = 'line-through';
    }


    deleteButton.addEventListener('click', async () => {
      const response = await fetch(`/delete-task/${task._id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        taskContainer.remove();
      }
    });

    checkBox.addEventListener('change', async () => {
      await fetch(`/update-task/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: checkBox.checked })
      });

      if (checkBox.checked) {
        ex_tasks.appendChild(taskContainer);
        taskElement.style.textDecoration = 'line-through';
      } else {
        todo_tasks.appendChild(taskContainer);
        taskElement.style.textDecoration = 'none';
      }
    });

    label.appendChild(checkBox);
    label.appendChild(taskElement);
    taskContainer.appendChild(label);
    taskContainer.appendChild(deleteButton);

    if (task.completed) {
      ex_tasks.appendChild(taskContainer);
    } else {
      todo_tasks.appendChild(taskContainer);
    }
  });
}

loadTasks();