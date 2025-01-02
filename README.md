# **To-Do** APP API

CRUD application

**Deployed on**: [Render](https://to-do-api-wcz8.onrender.com)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/DaniV3611/to-do-api.git
   ```
2. Navigate to the project directory:
   ```sh
   cd to-do-api
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Usage

1. Start the server:
   ```sh
   npm start
   ```
2. The API will be available at `http://localhost:3000`.

## API Endpoints

### Create a new task

- **URL:** `/tasks`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "title": "Task title",
    "description": "Task description",
    "parentId": null
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
    "title": "Updated title",
    "description": "Updated description",
    "done": true
  }
  ```

### Delete a task

- **URL:** `/tasks/:id`
- **Method:** `DELETE`
