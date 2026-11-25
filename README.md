
# Taller DOM + API con Node.js y Express

Aplicación web full-stack que integra una **Lista de Tareas** y una **Lista de Contactos** en un mismo proyecto. Conecta un servidor REST creado con **Node.js + Express** con una interfaz dinámica que manipula el **DOM** mediante JavaScript y `fetch`.

**Autor:** Alexander Solarte Narváez  
**Institución:** Institución Universitaria Antonio José Camacho (UNIAJC)

---

## Funcionalidades y métodos HTTP

La API REST implementada en `server.js` utiliza los cuatro métodos principales:

- **GET** (`/api/todos`, `/api/contacts`): obtiene las listas actuales de tareas y contactos para mostrarlas en pantalla.
- **POST** (`/api/todos`, `/api/contacts`): crea tareas y registra contactos desde los formularios de la interfaz.
- **PUT** (`/api/todos/:id`, `/api/contacts/:id`): actualiza el estado de las tareas (completada o pendiente) y permite modificar registros existentes.
- **DELETE** (`/api/todos/:id`, `/api/contacts/:id`): elimina tareas o contactos y actualiza el DOM.

## Estructura del proyecto

```text
taller-dom-api-express/
├── public/
│   ├── index.html      # Estructura HTML semántica de la interfaz
│   ├── styles.css      # Estilos visuales, tema oscuro y diseño responsivo
│   └── app.js          # Consumo de la API con fetch y manipulación del DOM
├── server.js           # Servidor Express, middlewares y rutas CRUD
├── package.json        # Dependencias y configuración del proyecto Node.js
├── .gitignore          # Exclusión de node_modules
└── README.md           # Documentación del proyecto
```

