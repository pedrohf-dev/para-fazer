const form = document.getElementById('form');
const input = document.getElementById('q');
const tasks = document.getElementById('tasks');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const task = document.createElement('h3'); 
  task.innerText = input.value;
  tasks.append(task);
  tasks.style.display = 'block';
  input.value = '';

  const addTask = fetch('/save-task', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: task.innerText })
  })
});