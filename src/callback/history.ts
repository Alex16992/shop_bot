import type { Bot } from "grammy";
import { getHistory } from "../helpers/shop/get_history";
import { replyHistory } from "../helpers/shop/reply_history";
import type { MyContext } from "../types";

export const historyCallback = (bot: Bot<MyContext>) => {
  bot.callbackQuery(/click-history-(\d+)/, async (ctx) => {
    const page = Number(ctx.match[1]); // номер страницы

    const history = await getHistory(ctx, page);

    if (history?.length !== 0) {
      replyHistory(ctx, page, history);
    }

    await ctx.answerCallbackQuery();
  });
};
