import type { Bot } from "grammy";
import { InputFile } from "grammy";
import { getProfile } from "../helpers/user/get_profile";
import { mainMenu } from "../menu/main_menu";
import type { MyContext } from "../types";

export const profileHears = (bot: Bot<MyContext>) => {
  bot.hears("👤 Профиль", async (ctx: MyContext) => {
    if (!ctx.callbackQuery) {
      ctx.replyWithPhoto(new InputFile("src/images/profile.jpg"), {
        reply_markup: mainMenu,
        caption: `${await getProfile(ctx)} \n\n`,
      });
    } else {
      ctx.callbackQuery.message?.editText(`${await getProfile(ctx)}`, {
        reply_markup: mainMenu,
      });

      ctx.callbackQuery.message?.editMedia({
        type: "photo",
        media: new InputFile("src/images/profile.jpg"),
      });
    }
  });
};
