const API_TODOS = '/api/todos';
const API_CONTACTS = '/api/contacts';

// Elementos del DOM - Tareas
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Elementos del DOM - Contactos
const contactForm = document.getElementById('contact-form');
const contactName = document.getElementById('contact-name');
const contactPhone = document.getElementById('contact-phone');
const contactEmail = document.getElementById('contact-email');
const contactList = document.getElementById('contact-list');

// ================= TAREAS =================
async function loadTodos() {
  try {
    const res = await fetch(API_TODOS);
    const todos = await res.json();
    renderTodos(todos);
  } catch (err) {
    console.error('Error cargando tareas:', err);
  }
}

function renderTodos(todos) {
  todoList.innerHTML = '';

  if (!Array.isArray(todos) || todos.length === 0) {
    todoList.innerHTML = '<li class="item">No hay tareas registradas.</li>';
    return;
  }

  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.className = 'item';

    const leftDiv = document.createElement('div');
    leftDiv.className = 'item-todo-main';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = Boolean(todo.completed);
    checkbox.addEventListener('change', () => toggleTodo(todo.id, checkbox.checked));

    const span = document.createElement('span');
    span.className = `item-todo-text ${todo.completed ? 'completed' : ''}`;
    span.textContent = todo.title || todo.text || 'Sin título';

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    li.appendChild(leftDiv);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

todoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = todoInput.value.trim();
  if (!title) return;

  try {
    const res = await fetch(API_TODOS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, text: title, completed: false }),
    });

    if (res.ok) {
      todoInput.value = '';
      loadTodos();
    }
  } catch (err) {
    console.error('Error creando tarea:', err);
  }
});

async function toggleTodo(id, completed) {
  try {
    await fetch(`${API_TODOS}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    });
    loadTodos();
  } catch (err) {
    console.error('Error actualizando tarea:', err);
  }
}

async function deleteTodo(id) {
  try {
    await fetch(`${API_TODOS}/${id}`, { method: 'DELETE' });
    loadTodos();
  } catch (err) {
    console.error('Error eliminando tarea:', err);
  }
}

// ================= CONTACTOS =================
async function loadContacts() {
  try {
    const res = await fetch(API_CONTACTS);
    const contacts = await res.json();
    renderContacts(contacts);
  } catch (err) {
    console.error('Error cargando contactos:', err);
  }
}

function renderContacts(contacts) {
  contactList.innerHTML = '';

  if (!Array.isArray(contacts) || contacts.length === 0) {
    contactList.innerHTML = '<li class="item">No hay contactos registrados.</li>';
    return;
  }

  contacts.forEach((contact) => {
    const li = document.createElement('li');
    li.className = 'item';

    const infoDiv = document.createElement('div');
    infoDiv.className = 'contact-info';

    const nameEl = document.createElement('strong');
    nameEl.textContent = contact.name;

    const detailsEl = document.createElement('small');
    detailsEl.textContent = `${contact.phone} · ${contact.email}`;

    infoDiv.appendChild(nameEl);
    infoDiv.appendChild(detailsEl);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.addEventListener('click', () => deleteContact(contact.id));

    li.appendChild(infoDiv);
    li.appendChild(deleteBtn);
    contactList.appendChild(li);
  });
}

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = contactName.value.trim();
  const phone = contactPhone.value.trim();
  const email = contactEmail.value.trim();

  if (!name || !phone || !email) return;

  try {
    const res = await fetch(API_CONTACTS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email }),
    });

    if (res.ok) {
      contactForm.reset();
      loadContacts();
    }
  } catch (err) {
    console.error('Error creando contacto:', err);
  }
});

async function deleteContact(id) {
  try {
    await fetch(`${API_CONTACTS}/${id}`, { method: 'DELETE' });
    loadContacts();
  } catch (err) {
    console.error('Error eliminando contacto:', err);
  }
}

// Inicio
loadTodos();
loadContacts();