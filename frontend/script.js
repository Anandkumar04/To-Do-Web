const BASE_URL = 'http://localhost:5000/api/tasks';

async function fetchTasks() {
  const res = await fetch(BASE_URL);
  const tasks = await res.json();

  const container = document.getElementById('task-container');
  container.innerHTML = ''; // Clear the container before adding new tasks
  tasks.forEach(task => {
    const div = document.createElement('div');
    div.className = 'task';

    const span = document.createElement('span');
    span.textContent = task.text;
    span.className = 'task-text ' + (task.completed ? 'completed' : '');
    span.onclick = () => toggleComplete(task._id);

    const btnContainer = document.createElement('div');
    btnContainer.className = 'task-buttons';

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = '✏️';
    editBtn.onclick = () => editTask(task._id, task.text);

    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑';
    delBtn.onclick = () => deleteTask(task._id);

    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(delBtn);

    div.appendChild(span);
    div.appendChild(btnContainer);

    container.append(div); // Use append instead of appendChild.
  });
}

async function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value;
  if (!text.trim()) return;

  await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });

  input.value = '';
  fetchTasks();
}

async function toggleComplete(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT'
  });
  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });
  fetchTasks();
}

async function editTask(id, currentText) {
  const newText = prompt('Edit your task:', currentText);
  if (newText && newText.trim() !== '') {
    await fetch(`${BASE_URL}/${id}/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newText })
    });
    fetchTasks();
  }
}

fetchTasks();