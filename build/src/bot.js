import { Bot } from "grammy";
import { PrismaClient } from "../generated/prisma";
import { BOT_TOKEN } from "./check_env";
const bot = new Bot(BOT_TOKEN);
const prisma = new PrismaClient();
bot.use(async (ctx, next) => {
    ctx.prisma = prisma;
    await next();
});
bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.on("message", (ctx) => ctx.reply("Got another message!"));
bot.start();
//# sourceMappingURL=bot.js.map