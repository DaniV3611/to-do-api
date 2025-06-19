import { db } from "./prisma";

// CRUD Operations over the database

// Create a new task
export const createTaskDB = async (
  title: string,
  description: string,
  parent: number | null = null,
  project: number | null = null,
  notes: string | null = null,
  dueDate: string | null = null,
  dueTime: string | null = null
) => {
  // Create a new task
  const task = await db.task.create({
    data: {
      title: title,
      description: description,
      parentId: parent,
      projectId: project,
      notes: notes,
      dueDate: dueDate,
      dueTime: dueTime,
    },
  });
  return task.id;
};

// Get all tasks
export const getAllTasksDB = async () => {
  const tasks = await db.task.findMany({
    include: {
      children: true,
      project: true,
    },
  });
  return tasks;
};

// Get a task by id
export const getTaskByIdDB = async (id: number) => {
  const task = await db.task.findUnique({
    where: {
      id: id,
    },
    include: {
      children: true,
      project: true,
    },
  });
  return task;
};

// Update a task
export const updateTaskDB = async (
  id: number,
  updateData: {
    title?: string;
    description?: string;
    done?: boolean;
    notes?: string | null;
    dueDate?: string | null;
    dueTime?: string | null;
    parentId?: number | null;
    projectId?: number | null;
  }
) => {
  // Filter out undefined values to only update provided fields
  const filteredData = Object.fromEntries(
    Object.entries(updateData).filter(([_, value]) => value !== undefined)
  );

  const task = await db.task.update({
    where: {
      id: id,
    },
    data: filteredData,
  });
  return task;
};

// Delete a task
export const deleteTaskDB = async (id: number) => {
  const task = await db.task.delete({
    where: {
      id: id,
    },
  });
  return task;
};

// * CRUD Operations for Projects over the database

// Create a new project
export const createProjectDB = async (
  name: string,
  description: string | null = null
) => {
  const project = await db.project.create({
    data: { name, description },
  });
  return project;
};

// Get all projects
export const getAllProjectsDB = async (includeTasks: boolean = false) => {
  const projects = await db.project.findMany({
    include: {
      tasks: includeTasks,
    },
  });
  return projects;
};

// Get a project by id
export const getProjectByIdDB = async (
  id: number,
  includeTasks: boolean = true
) => {
  const project = await db.project.findUnique({
    where: { id },
    include: { tasks: includeTasks },
  });
  return project;
};

// Update a project
export const updateProjectDB = async (
  id: number,
  updateData: {
    name?: string;
    description?: string | null;
  }
) => {
  const project = await db.project.update({
    where: { id },
    data: updateData,
  });
  return project;
};

// Delete a project
export const deleteProjectDB = async (id: number) => {
  const project = await db.project.delete({
    where: { id },
  });
  return project;
};
