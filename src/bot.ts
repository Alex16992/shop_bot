import { Bot } from "grammy";
import { PrismaClient, type Product } from "../generated/prisma";
import { BOT_TOKEN } from "./check_env";
import type { MyContext } from "./types";

const bot = new Bot<MyContext>(BOT_TOKEN);
const prisma = new PrismaClient();

bot.use(async (ctx, next) => {
  ctx.prisma = prisma;
  await next();
});

const products: Product[] = [];

bot.command("products", (ctx) => ctx.reply(JSON.stringify(products)));

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.on("message", (ctx) => ctx.reply("Got another message!"));

bot.start();
