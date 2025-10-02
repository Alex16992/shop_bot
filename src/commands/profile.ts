import type { Bot } from "grammy";
import { mainMenu } from "../menu/main_menu";
import type { MyContext } from "../types";
import { getProfile } from "../user/get_profile";

export const profileCommand = (bot: Bot<MyContext>) => {
  bot.command("profile", async (ctx) => {
    ctx.reply(`${await getProfile(bot, ctx)} \n\n`, {
      reply_markup: mainMenu,
    });
  });
};
