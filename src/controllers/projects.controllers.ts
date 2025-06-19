import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import {
  createProjectDB,
  deleteProjectDB,
  getAllProjectsDB,
  getProjectByIdDB,
  updateProjectDB,
} from "../../lib/crud";

export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    // Basic validation to check required fields
    if (!name || typeof name !== "string" || name.trim() === "") {
      return void res.status(400).json({
        message: "Project name is required and must be a non-empty string",
        error: "Missing or invalid required field",
      });
    }

    // Validate description if provided
    if (
      description !== undefined &&
      description !== null &&
      typeof description !== "string"
    ) {
      return void res.status(400).json({
        message: "Description must be a string or null",
        error: "Invalid description format",
      });
    }

    // Trim whitespace from name and description
    const trimmedName = name.trim();
    const trimmedDescription = description ? description.trim() : description;

    // Check if trimmed name is not empty
    if (trimmedName === "") {
      return void res.status(400).json({
        message: "Project name cannot be empty or contain only whitespace",
        error: "Invalid project name",
      });
    }

    const project = await createProjectDB(trimmedName, trimmedDescription);
    res.status(201).json(project);
  } catch (error) {
    // Specific error handling for Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Unique constraint violation (P2002)
      if (error.code === "P2002") {
        return void res.status(400).json({
          message: "A project with this name already exists",
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
      message: "Error creating project",
      error: "Internal server error",
    });
  }
};

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const { includeTasks } = req.query;
    const projects = await getAllProjectsDB(includeTasks === "true");
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Error getting projects",
      error: "Internal server error",
    });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { includeTasks } = req.query;
    const project = await getProjectByIdDB(
      parseInt(id),
      includeTasks ? includeTasks === "true" : true
    );
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({
      message: "Error getting project",
      error: "Internal server error",
    });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Basic validation for project ID
    const projectId = parseInt(id);
    if (isNaN(projectId) || projectId <= 0) {
      return void res.status(400).json({
        message: "Invalid project ID",
        error: "Project ID must be a positive number",
      });
    }

    // Check if at least one field is provided for update
    const updateFields = { name, description };
    const hasValidFields = Object.values(updateFields).some(
      (value) => value !== undefined
    );

    if (!hasValidFields) {
      return void res.status(400).json({
        message: "At least one field must be provided for update",
        error: "No update data provided",
      });
    }

    // Validate name if provided
    if (name !== undefined) {
      if (typeof name !== "string" || name.trim() === "") {
        return void res.status(400).json({
          message: "Project name must be a non-empty string",
          error: "Invalid name format",
        });
      }
    }

    // Validate description if provided
    if (
      description !== undefined &&
      description !== null &&
      typeof description !== "string"
    ) {
      return void res.status(400).json({
        message: "Description must be a string or null",
        error: "Invalid description format",
      });
    }

    // Prepare update data with trimmed values
    const updateData: { name?: string; description?: string | null } = {};

    if (name !== undefined) {
      const trimmedName = name.trim();
      if (trimmedName === "") {
        return void res.status(400).json({
          message: "Project name cannot be empty or contain only whitespace",
          error: "Invalid project name",
        });
      }
      updateData.name = trimmedName;
    }

    if (description !== undefined) {
      updateData.description = description ? description.trim() : description;
    }

    const project = await updateProjectDB(projectId, updateData);
    res.status(200).json(project);
  } catch (error) {
    // Specific error handling for Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Record not found (P2025)
      if (error.code === "P2025") {
        return void res.status(404).json({
          message: "Project not found",
          error: "The project you're trying to update doesn't exist",
        });
      }

      // Unique constraint violation (P2002)
      if (error.code === "P2002") {
        return void res.status(400).json({
          message: "A project with this name already exists",
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
      message: "Error updating project",
      error: "Internal server error",
    });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await deleteProjectDB(parseInt(id));
    res.status(200).json(project);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return void res.status(404).json({
          message: "Project not found",
          error: "The project you're trying to delete doesn't exist",
        });
      }
    }
    res.status(500).json({
      message: "Error deleting project",
      error: "Internal server error",
    });
  }
};
