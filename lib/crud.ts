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
