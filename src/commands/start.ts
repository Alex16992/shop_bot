import { type Bot, InputFile, Keyboard } from "grammy";
import { getProfile } from "../helpers/user/get_profile";
import { mainMenu } from "../menu/main_menu";
import { UserDbService } from "../services/user";
import type { MyContext } from "../types";

export const startCommand = (bot: Bot<MyContext>) => {
  bot.command("start", async (ctx) => {
    if (!ctx.from)
      return ctx.reply("Ошибка получения данных пользователя телеграм.");

    UserDbService.authOrCreateUser(ctx.from.id.toString(), ctx.from.username);

    const keyboard = new Keyboard()
      .text("🛍️ Каталог")
      .row()
      .text("👤 Профиль")
      .text("⚠️ Поддержка")
      .row()
      .text("ℹ️ О нас")
      .row()
      .text("🌐 Сменить язык | Change language");

    ctx.replyWithSticker(
      "CAACAgIAAxkBAAE8A9ho4O2-WYsZst1dqR7zWdBpDkQ6PgACCwADDkfHKKig9PrirOHBNgQ",
      {
        reply_markup: keyboard,
      }
    );

    ctx.replyWithPhoto(new InputFile("src/images/profile.jpg"), {
      reply_markup: mainMenu,
      caption: await getProfile(ctx),
    });
  });
};
