const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Datos iniciales en memoria
let todos = [
  { id: 1, title: 'Entregar taller DOM + API Express', completed: false }
];

let contacts = [
  { id: 1, name: 'Carlos Pérez', phone: '3105551234', email: 'carlos@correo.com' }
];

let nextTodoId = 2;
let nextContactId = 2;

// ==================== RUTAS DE TAREAS (TODOS) ====================
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { title, completed = false } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'El título de la tarea es obligatorio' });
  }
  const newTodo = {
    id: nextTodoId++,
    title: title.trim(),
    completed: Boolean(completed)
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  const { title, completed } = req.body;
  if (title !== undefined) todos[index].title = String(title).trim();
  if (completed !== undefined) todos[index].completed = Boolean(completed);
  res.json(todos[index]);
});

app.delete('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const exists = todos.some(item => item.id === id);
  if (!exists) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  todos = todos.filter(item => item.id !== id);
  res.status(200).json({ message: 'Tarea eliminada', id });
});

// ==================== RUTAS DE CONTACTOS (CONTACTS) ====================
app.get('/api/contacts', (req, res) => {
  res.json(contacts);
});

app.post('/api/contacts', (req, res) => {
  const { name, phone, email = '' } = req.body;
  if (!name || !name.trim() || !phone || !phone.trim()) {
    return res.status(400).json({ error: 'Nombre y teléfono son obligatorios' });
  }
  const newContact = {
    id: nextContactId++,
    name: name.trim(),
    phone: phone.trim(),
    email: String(email).trim()
  };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

app.put('/api/contacts/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Contacto no encontrado' });
  }
  const { name, phone, email } = req.body;
  if (name !== undefined) contacts[index].name = String(name).trim();
  if (phone !== undefined) contacts[index].phone = String(phone).trim();
  if (email !== undefined) contacts[index].email = String(email).trim();
  res.json(contacts[index]);
});

app.delete('/api/contacts/:id', (req, res) => {
  const id = Number(req.params.id);
  const exists = contacts.some(item => item.id === id);
  if (!exists) {
    return res.status(404).json({ error: 'Contacto no encontrado' });
  }
  contacts = contacts.filter(item => item.id !== id);
  res.status(200).json({ message: 'Contacto eliminado', id });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
