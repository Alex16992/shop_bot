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
      .text("🌐 Сменить язык | Change language")
      .resized();

    ctx.replyWithSticker(
      "CAACAgIAAxkBAAE8BM5o4QFyLYoqHJc2GKDszKL_euJA7AACdQQAAsxUSQk-AwAB8-URJbU2BA",
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
