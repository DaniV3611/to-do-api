import { Router } from "express";

// Imports the controllers from tasks.controllers.ts
import {
  createTask,
  getAllTasks,
  getTaskByID,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controllers";

// Creates a new router
const router = Router();

// Define the routes with each controller
router.get("/", getAllTasks);
router.get("/:id", getTaskByID);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
