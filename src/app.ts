import express, { Request, Response } from "express";
import cors from "cors";

// Import the routes for the crud of tasks
import tasksRoutes from "./routes/tasks.routes";

// Create an instance of express
const app = express();

// Middleware
app.use(cors()); // Solves cross-origin issues
app.use(express.json()); // Parses JSON bodies

// Uses the routes from tasks.routes.ts
app.use("/tasks", tasksRoutes);

// Default route
app.get("/*", (req: Request, res: Response) => {
  res.status(404).json("Not Found");
});

export default app;
