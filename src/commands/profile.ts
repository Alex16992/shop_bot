import type { Bot } from "grammy";
import { getProfile } from "../helpers/user/get_profile";
import { mainMenu } from "../menu/main_menu";
import type { MyContext } from "../types";

export const profileCommand = (bot: Bot<MyContext>) => {
  bot.command("profile", async (ctx) => {
    ctx.reply(`${await getProfile(ctx)} \n\n`, {
      reply_markup: mainMenu,
    });
  });
};
