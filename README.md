# **To-Do API with Project Management**

A complete REST API for task and project management with advanced features like due dates, notes, hierarchical tasks, and project organization.

**Deployed on**: [Render](https://to-do-api-wcz8.onrender.com)

## 🚀 Features

- ✅ **Complete task CRUD** with advanced fields
- 📁 **Project management** with associated tasks
- 📅 **Due dates and times** for tasks
- 📝 **Additional notes** in tasks
- 🔗 **Hierarchical tasks** (parent and child tasks)
- 🗄️ **SQLite database** with Prisma ORM
- 🌐 **CORS enabled** for frontend integration
- 💾 **Robust data validation** for input data

## 📋 Data Model

### Project

- `id`: Unique identifier
- `name`: Project name (required)
- `description`: Optional description
- `tasks`: List of associated tasks
- `createdAt`: Creation date
- `updatedAt`: Last update date

### Task

- `id`: Unique identifier
- `title`: Task title (required)
- `description`: Task description (required)
- `notes`: Additional notes (optional)
- `done`: Completion status (default: false)
- `dueDate`: Due date (optional)
- `dueTime`: Due time (optional)
- `parentId`: Parent task ID (for subtasks)
- `projectId`: Associated project ID
- `createdAt`: Creation date
- `updatedAt`: Last update date

## 🛠️ Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/DaniV3611/to-do-api.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd to-do-api
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up the database:**

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

## ▶️ Usage

### Development mode:

```bash
npm run dev
```

### Production mode:

```bash
npm start
```

The API will be available at `http://localhost:3000`

## 📚 API Endpoints

### 🏠 Main Route

#### Welcome message

- **URL:** `/`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "message": "Welcome to the To-Do API",
    "version": "1.0.0",
    "author": "Daniel Velasco (daniv)"
  }
  ```

---

## 📁 Project Management

### Create a new project

- **URL:** `/projects`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "My Project",
    "description": "Project description (optional)"
  }
  ```

### Get all projects

- **URL:** `/projects`
- **Method:** `GET`
- **Query Parameters:**
  - `includeTasks=true`: Include associated tasks in response

### Get a specific project

- **URL:** `/projects/:id`
- **Method:** `GET`
- **Query Parameters:**
  - `includeTasks=true`: Include associated tasks (enabled by default)

### Update a project

- **URL:** `/projects/:id`
- **Method:** `PUT`
- **Body:**
  ```json
  {
    "name": "New name",
    "description": "New description"
  }
  ```

### Delete a project

- **URL:** `/projects/:id`
- **Method:** `DELETE`

---

## ✅ Task Management

### Create a new task

- **URL:** `/tasks`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "title": "Task title",
    "description": "Task description",
    "notes": "Additional notes (optional)",
    "dueDate": "2024-12-31 (optional)",
    "dueTime": "14:30 (optional)",
    "parentId": null,
    "projectId": 1
  }
  ```

### Get all tasks

- **URL:** `/tasks`
- **Method:** `GET`

### Get a specific task

- **URL:** `/tasks/:id`
- **Method:** `GET`

### Update a task

- **URL:** `/tasks/:id`
- **Method:** `PUT`
- **Body:**
  ```json
  {
    "title": "New title",
    "description": "New description",
    "notes": "New notes",
    "done": true,
    "dueDate": "2024-12-31",
    "dueTime": "15:00",
    "parentId": null,
    "projectId": 2
  }
  ```

### Delete a task

- **URL:** `/tasks/:id`
- **Method:** `DELETE`

---

## 🏗️ Project Structure

```
to-do-api/
├── src/
│   ├── app.ts                    # Express configuration
│   ├── controllers/
│   │   ├── projects.controllers.ts  # Project logic
│   │   └── tasks.controllers.ts     # Task logic
│   └── routes/
│       ├── projects.routes.ts       # Project routes
│       └── tasks.routes.ts          # Task routes
├── lib/
│   ├── crud.ts                   # Database functions
│   └── prisma.ts                 # Prisma client
├── prisma/
│   └── schema.prisma             # Database schema
├── index.ts                      # Entry point
└── package.json                  # Dependencies and scripts
```

## 🔧 Technologies Used

- **Node.js** + **TypeScript** - Runtime and language
- **Express.js** - Web framework
- **Prisma** - Database ORM
- **SQLite** - Database
- **CORS** - Cross-origin request middleware

## 📝 Validations

- ✅ Required field validation
- ✅ Data type validation
- ✅ Prisma-specific error handling
- ✅ Numeric ID validation
- ✅ Whitespace sanitization

## 🚀 Available Scripts

- `npm start` - Run in production (compile TypeScript + execute)
- `npm run dev` - Run in development mode with nodemon
- `npm run build` - Compile TypeScript to JavaScript

## 🌐 Deployment

The project is configured to deploy on Render. Make sure to:

1. Configure necessary environment variables
2. Run Prisma migrations in production
3. The `start` script handles compilation automatically

---

**Developed by:** Daniel Velasco (daniv)  
**Version:** 1.0.0
