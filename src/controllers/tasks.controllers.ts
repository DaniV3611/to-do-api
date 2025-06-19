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
  try {
    // Get the task data from the request body
    const {
      title,
      description,
      parentId = null,
      projectId = null,
      notes = null,
      date = null,
    } = req.body;

    // Create the task in the database
    const taskId = await createTaskDB(
      title,
      description,
      parentId,
      projectId,
      notes,
      date
    );

    // Send a response with the task id
    res
      .status(201)
      .json({ message: `Task created with id: ${taskId}`, taskId });
  } catch (error) {
    res.status(500).json({
      message: "Error creating task",
      error: error,
    });
  }
};

// Controller to get all tasks and send a response
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await getAllTasksDB();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Error getting tasks",
      error: error,
    });
  }
};

// Controller to get a task by id and send a response
export const getTaskByID = async (req: Request, res: Response) => {
  try {
    const taskId = parseInt(req.params.id);
    const task = await getTaskByIdDB(taskId);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Error getting task",
      error: error,
    });
  }
};

// Controller to update a task and send a response
export const updateTask = async (req: Request, res: Response) => {
  try {
    const taskId = parseInt(req.params.id);
    const { title, description, done } = req.body;
    const task = await updateTaskDB(taskId, title, description, done);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Error updating task",
      error: error,
    });
  }
};

// Controller to delete a task and send a response
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = parseInt(req.params.id);
    await deleteTaskDB(taskId);
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting task",
      error: error,
    });
  }
};
