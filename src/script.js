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
  todo_tasks.appendChild(taskContainer);
  todo_tasks.style.display = 'block';

  checkBox.addEventListener('change', async (e) => {
    e.preventDefault()
    if(checkBox.checked) {
      ex_tasks.appendChild(taskContainer)
    }
  });

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
      if (todo_tasks.children.length === 0) {
        todo_tasks.style.display = 'none';
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
        if (todo_tasks.children.length === 0) {
          todo_tasks.style.display = 'none';
        };
      } else {
        console.error("Erro ao deletar tarefa do banco.");
      }
    });

    label.appendChild(checkBox);
    label.appendChild(taskElement);
    taskContainer.appendChild(label);
    taskContainer.appendChild(deleteButton);
    todo_tasks.appendChild(taskContainer);
    
    checkBox.addEventListener('change', async (e) => {
      e.preventDefault()
      if(checkBox.checked) {
        ex_tasks.appendChild(taskContainer)
      } else {
        todo_tasks.appendChild(taskContainer)
      }
    });

  });


  if (task_list.length > 0) {
    todo_tasks.style.display = 'block';
  };
}

loadTasks();