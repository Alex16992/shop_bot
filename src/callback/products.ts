import type { Bot } from "grammy";
import { getProducts } from "../helpers/shop/get_products";
import { replyProducts } from "../helpers/shop/replyProducts";
import type { MyContext } from "../types";

export const productsCallback = (bot: Bot<MyContext>) => {
  bot.callbackQuery(/click-products-(\d+)/, async (ctx) => {
    const page = Number(ctx.match[1]); // номер страницы

    const products = await getProducts(ctx, page);

    if (
      products?.length !== 0 &&
      (page === 1 || page !== ctx.session.productsPage)
    ) {
      replyProducts(ctx, page, products);
    }

    await ctx.answerCallbackQuery();
  });
};
