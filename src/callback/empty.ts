import type { Bot } from "grammy";
import type { MyContext } from "../types";

// Отмена загрузки для пустых кнопок
export const emptyCallback = (bot: Bot<MyContext>) => {
  bot.callbackQuery("click-empty", async (ctx) => {
    await ctx.answerCallbackQuery();
  });
};
