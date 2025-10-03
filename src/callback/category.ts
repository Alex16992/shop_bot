import type { Bot } from "grammy";
import { getProducts } from "../helpers/shop/get_products";
import { replyProducts } from "../helpers/shop/reply_products";
import type { MyContext } from "../types";

export const categoryCallback = (bot: Bot<MyContext>) => {
  bot.callbackQuery(/click-category-(\d+)/, async (ctx) => {
    const categoryId = Number(ctx.match[1]);

    ctx.session.categoryId = categoryId;

    const products = await getProducts(ctx, 1, categoryId);

    if (products?.length !== 0) {
      replyProducts(ctx, 1, products);
    }

    await ctx.answerCallbackQuery();
  });
};
