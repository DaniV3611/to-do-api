import express, { Request, Response } from "express";
import cors from "cors";

// Import the routes for the crud of tasks
import tasksRoutes from "./routes/tasks.routes";
import projectsRoutes from "./routes/projects.routes";

// Create an instance of express
const app = express();

// Middleware
app.use(cors()); // Solves cross-origin issues
app.use(express.json()); // Parses JSON bodies

// Main route - Welcome message
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the To-Do API",
    version: "1.0.0",
    author: "Daniel Velasco (daniv)",
  });
});

// Uses the routes from tasks.routes.ts
app.use("/tasks", tasksRoutes);
app.use("/projects", projectsRoutes);

// Default route
app.get("/*", (req: Request, res: Response) => {
  res.status(404).json("Not Found, go to /tasks or /projects");
});

export default app;
