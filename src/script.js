const form = document.getElementById('form');
const input = document.getElementById('q');
const tasks = document.getElementById('tasks');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = document.createElement('h3'); 
  task.innerText = input.value;
  tasks.append(task);
  input.value = ''; // Limpa o campo de entrada após adicionar a tarefa
});
