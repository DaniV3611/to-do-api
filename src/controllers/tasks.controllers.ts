import { Request, Response } from "express";

// Imports the CRUD functions from the lib folder
import {
  createTaskDB,
  deleteTaskDB,
  getAllTasksDB,
  getTaskByIdDB,
  updateTaskDB,
} from "../../lib/crud";

// Controller to read the request, create a task and send a response
export const createTask = async (req: Request, res: Response) => {
  const { title, description, parentId } = req.body;
  const taskId = await createTaskDB(title, description, parentId);
  res.json(`Task created with id: ${taskId}`);
};

// Controller to get all tasks and send a response
export const getAllTasks = async (req: Request, res: Response) => {
  const tasks = await getAllTasksDB();
  res.json(tasks);
};

// Controller to get a task by id and send a response
export const getTaskByID = async (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id);
  const task = await getTaskByIdDB(taskId);
  res.json(task);
};

// Controller to update a task and send a response
export const updateTask = async (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id);
  const { title, description, done } = req.body;
  const task = await updateTaskDB(taskId, title, description, done);
  res.json(task);
};

// Controller to delete a task and send a response
export const deleteTask = async (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id);
  await deleteTaskDB(taskId);
  res.json("Task deleted");
};
