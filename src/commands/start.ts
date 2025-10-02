import type { Bot } from "grammy";
import { UserDbService } from "../services/user";
import type { MyContext } from "../types";
import { getProfile } from "../user/get_profile";

export const startCommand = (bot: Bot<MyContext>) => {
  bot.command("start", async (ctx) => {
    if (!ctx.from)
      return ctx.reply("Ошибка получения данных пользователя телеграм.");

    UserDbService.authOrCreateUser(ctx.from.id.toString(), ctx.from.username);

    ctx.reply(await getProfile(bot, ctx));
  });
};
