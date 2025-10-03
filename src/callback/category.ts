import type { Bot } from "grammy";
import { getCategory } from "../helpers/shop/get_category";
import { replyCategory } from "../helpers/shop/reply_category";
import type { MyContext } from "../types";

export const categoryCallback = (bot: Bot<MyContext>) => {
  bot.callbackQuery(/click-category-(\d+)/, async (ctx) => {
    const page = Number(ctx.match[1]); // номер страницы

    const categories = await getCategory(ctx, page);

    if (categories?.length !== 0) {
      replyCategory(ctx, page, categories);
    }

    await ctx.answerCallbackQuery();
  });
};
