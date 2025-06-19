import { Router } from "express";

// Imports the controllers from tasks.controllers.ts
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projects.controllers";

// Creates a new router
const router = Router();

// Define the routes with each controller
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
