import type { Bot } from "grammy";
import { InputFile } from "grammy";
import { getProfile } from "../helpers/user/get_profile";
import { mainMenu } from "../menu/main_menu";
import type { MyContext } from "../types";

export const profileCallback = (bot: Bot<MyContext>) => {
  bot.callbackQuery("click-profile", async (ctx) => {
    ctx.callbackQuery.message?.editText(`${await getProfile(ctx)}`, {
      reply_markup: mainMenu,
    });

    ctx.callbackQuery.message?.editMedia({
      type: "photo",
      media: new InputFile("src/images/profile.jpg"),
    });

    await ctx.answerCallbackQuery();
  });
};
