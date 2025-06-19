import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

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
      dueDate = null,
      dueTime = null,
    } = req.body;

    // Basic validation to check required fields
    if (!title || !description) {
      return void res.status(400).json({
        message: "Title and description are required",
        error: "Missing required fields",
      });
    }

    // Create the task in the database
    const taskId = await createTaskDB(
      title,
      description,
      parentId,
      projectId,
      notes,
      dueDate,
      dueTime
    );

    // Send a response with the task id
    res
      .status(201)
      .json({ message: `Task created with id: ${taskId}`, taskId });
  } catch (error) {
    // Specific error handling for Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Unique constraint violation (P2002)
      if (error.code === "P2002") {
        return void res.status(400).json({
          message: "A task with this data already exists",
          error: "Duplicate entry",
          field: error.meta?.target,
        });
      }

      // Foreign key not found (P2003)
      if (error.code === "P2003") {
        return void res.status(400).json({
          message: "Referenced record not found",
          error: "Foreign key constraint failed",
          field: error.meta?.field_name,
        });
      }

      // Required value missing (P2012)
      if (error.code === "P2012") {
        return void res.status(400).json({
          message: "Required field is missing",
          error: "Missing required value",
          field: error.meta?.field,
        });
      }

      // Validation error (P2006)
      if (error.code === "P2006") {
        return void res.status(400).json({
          message: "Invalid data provided",
          error: "Invalid value for database field",
          field: error.meta?.field,
        });
      }
    }

    // Prisma validation error
    if (error instanceof Prisma.PrismaClientValidationError) {
      return void res.status(400).json({
        message: "Invalid data format",
        error: "Validation failed",
        details: error.message,
      });
    }

    // Generic error
    console.error("Unexpected error:", error);
    res.status(500).json({
      message: "Error creating task",
      error: "Internal server error",
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
    if (!task) return void res.status(404).json({ message: "Task not found" });
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

    // Basic validation for task ID
    if (isNaN(taskId) || taskId <= 0) {
      return void res.status(400).json({
        message: "Invalid task ID",
        error: "Task ID must be a positive number",
      });
    }

    // Get update data from request body
    const {
      title,
      description,
      done,
      notes,
      dueDate,
      dueTime,
      parentId,
      projectId,
    } = req.body;

    // Check if at least one field is provided for update
    const updateFields = {
      title,
      description,
      done,
      notes,
      dueDate,
      dueTime,
      parentId,
      projectId,
    };
    const hasValidFields = Object.values(updateFields).some(
      (value) => value !== undefined
    );

    if (!hasValidFields) {
      return void res.status(400).json({
        message: "At least one field must be provided for update",
        error: "No update data provided",
      });
    }

    // Additional validation for specific fields
    if (
      title !== undefined &&
      (typeof title !== "string" || title.trim() === "")
    ) {
      return void res.status(400).json({
        message: "Title must be a non-empty string",
        error: "Invalid title format",
      });
    }

    if (
      description !== undefined &&
      (typeof description !== "string" || description.trim() === "")
    ) {
      return void res.status(400).json({
        message: "Description must be a non-empty string",
        error: "Invalid description format",
      });
    }

    if (done !== undefined && typeof done !== "boolean") {
      return void res.status(400).json({
        message: "Done must be a boolean value",
        error: "Invalid done field format",
      });
    }

    if (
      parentId !== undefined &&
      parentId !== null &&
      (isNaN(parentId) || parentId <= 0)
    ) {
      return void res.status(400).json({
        message: "Parent ID must be a positive number or null",
        error: "Invalid parent ID format",
      });
    }

    if (
      projectId !== undefined &&
      projectId !== null &&
      (isNaN(projectId) || projectId <= 0)
    ) {
      return void res.status(400).json({
        message: "Project ID must be a positive number or null",
        error: "Invalid project ID format",
      });
    }

    // Update the task in the database
    const task = await updateTaskDB(taskId, updateFields);
    res.status(200).json(task);
  } catch (error) {
    // Specific error handling for Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Record not found (P2025)
      if (error.code === "P2025") {
        return void res.status(404).json({
          message: "Task not found",
          error: "The task you're trying to update doesn't exist",
        });
      }

      // Unique constraint violation (P2002)
      if (error.code === "P2002") {
        return void res.status(400).json({
          message: "A task with this data already exists",
          error: "Duplicate entry",
          field: error.meta?.target,
        });
      }

      // Foreign key not found (P2003)
      if (error.code === "P2003") {
        return void res.status(400).json({
          message: "Referenced record not found",
          error: "Foreign key constraint failed",
          field: error.meta?.field_name,
        });
      }

      // Required value missing (P2012)
      if (error.code === "P2012") {
        return void res.status(400).json({
          message: "Required field is missing",
          error: "Missing required value",
          field: error.meta?.field,
        });
      }

      // Validation error (P2006)
      if (error.code === "P2006") {
        return void res.status(400).json({
          message: "Invalid data provided",
          error: "Invalid value for database field",
          field: error.meta?.field,
        });
      }
    }

    // Prisma validation error
    if (error instanceof Prisma.PrismaClientValidationError) {
      return void res.status(400).json({
        message: "Invalid data format",
        error: "Validation failed",
        details: error.message,
      });
    }

    // Generic error
    console.error("Unexpected error:", error);
    res.status(500).json({
      message: "Error updating task",
      error: "Internal server error",
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
    // Specific error handling for Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Record not found (P2025)
      if (error.code === "P2025") {
        return void res.status(404).json({
          message: "Task not found",
          error: "The task you're trying to delete doesn't exist",
        });
      }
    }

    // Generic error
    console.error("Unexpected error:", error);
    res.status(500).json({
      message: "Error deleting task",
      error: "Internal server error",
    });
  }
};
