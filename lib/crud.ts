import { db } from "./prisma";

// CRUD Operations over the database

// Create a new task
export const createTaskDB = async (
  title: string,
  description: string,
  parent: number | null = null
) => {
  // Create a new task
  const task = await db.task.create({
    data: {
      title: title,
      description: description,
      parentId: parent,
    },
  });
  return task.id;
};

// Get all tasks
export const getAllTasksDB = async () => {
  const tasks = await db.task.findMany();
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
  title: string,
  description: string,
  done: boolean
) => {
  const task = await db.task.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      description: description,
      done: done,
    },
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
