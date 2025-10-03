import type { Bot } from "grammy";
import { getProducts } from "../helpers/shop/get_products";
import { replyProducts } from "../helpers/shop/reply_products";
import type { MyContext } from "../types";

export const productsCallback = (bot: Bot<MyContext>) => {
  bot.callbackQuery(/click-products-(\d+)/, async (ctx) => {
    const page = Number(ctx.match[1]); // номер страницы

    const products = await getProducts(ctx, page);

    if (products?.length !== 0) {
      replyProducts(ctx, page, products);
    }

    await ctx.answerCallbackQuery();
  });
};
