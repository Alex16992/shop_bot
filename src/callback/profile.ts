import type { Bot } from "grammy";
import { mainMenu } from "../menu/main_menu";
import type { MyContext } from "../types";
import { getProfile } from "../user/get_profile";

export const profileCallback = (bot: Bot<MyContext>) => {
  bot.callbackQuery("click-profile", async (ctx) => {
    const random = Math.floor(Math.random() * 1000);

    ctx.callbackQuery.message?.editText(
      `${await getProfile(bot, ctx)} \n\n${random}`,
      {
        reply_markup: mainMenu,
      }
    );

    await ctx.answerCallbackQuery();
  });
};
