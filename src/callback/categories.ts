import type { Bot } from "grammy";
import { getCategories } from "../helpers/shop/get_categories";
import { replyCategories } from "../helpers/shop/reply_categories";
import type { MyContext } from "../types";

export const categoriesCallback = (bot: Bot<MyContext>) => {
  bot.callbackQuery(/click-categories-(\d+)/, async (ctx) => {
    const page = Number(ctx.match[1]); // номер страницы

    const categories = await getCategories(ctx, page);

    if (categories?.length !== 0) {
      replyCategories(ctx, page, categories);
    }

    await ctx.answerCallbackQuery();
  });
};
