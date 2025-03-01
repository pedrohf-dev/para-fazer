const form = document.getElementById('form');
const input = document.getElementById('q');
const tasks = document.getElementById('tasks');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const task = document.createElement('h3'); 
  task.innerText = input.value;
  tasks.append(task);
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
    const taskElement = document.createElement('h3');
    taskElement.innerText = task.text;
    tasks.append(taskElement);
  });
  if (task_list.length > 0) {
    tasks.style.display = 'block';
  }
}
loadTasks();
