import type { Bot } from "grammy";
import { topUpBalance } from "../helpers/user/top_up_balance";

import type { MyContext } from "../types";

export const balanceCallback = (bot: Bot<MyContext>) => {
  bot.callbackQuery("click-balance", async (ctx) => {
    topUpBalance(ctx);
    await ctx.answerCallbackQuery();
  });
};
