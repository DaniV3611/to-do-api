import { PrismaClient } from "@prisma/client";

// Singleton Prisma Client Instance
export const db = new PrismaClient();
