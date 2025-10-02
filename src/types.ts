import type { PrismaClient } from "@prisma/client";
import type { Context } from "grammy";

export interface MyContext extends Context {
  prisma: PrismaClient;
}
