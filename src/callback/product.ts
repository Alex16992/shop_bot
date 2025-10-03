import type { Bot } from "grammy";
import { getProduct } from "../helpers/shop/get_product";
import { replyProduct } from "../helpers/shop/reply_product";
import type { MyContext } from "../types";

export const productCallback = (bot: Bot<MyContext>) => {
  bot.callbackQuery(/click-product-(\d+)/, async (ctx) => {
    const productId = Number(ctx.match[1]); // id товара

    const product = await getProduct(ctx, productId);

    if (product) {
      replyProduct(ctx, product);
    }

    await ctx.answerCallbackQuery();
  });
};
