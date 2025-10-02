import type { Bot } from "grammy";
import prisma from "../prisma";
import type { MyContext } from "../types";

export const profileCommand = (bot: Bot<MyContext>) => {
  bot.command("profile", async (ctx) => {
    if (!ctx.from)
      return ctx.reply("Ошибка получения данных пользователя телеграм.");

    const user = await prisma.user.findUnique({
      where: { id: ctx.from?.id },
    });

    if (!user) return;

    const accessLevels: Record<number, string> = {
      0: "Пользователь",
      1: "Модератор",
      2: "Администратор",
    };

    const roleName = accessLevels[user.accessLevel] ?? "Неизвестно";

    await ctx.reply(`
        Ваш профиль:
        username: ${user.username ?? "null"}
        accessLevel: ${roleName}
        Дата регистрации: ${user.createdAt.toLocaleString("ru-RU")}
      `);
  });
};
