import type { Bot } from "grammy";
import { buyProduct } from "../helpers/shop/buy_product";
import type { MyContext } from "../types";

export const buyProductCallback = (bot: Bot<MyContext>) => {
  bot.callbackQuery(/click-product-buy-(\d+)/, async (ctx) => {
    const productId = Number(ctx.match[1]);

    buyProduct(ctx, productId);

    await ctx.answerCallbackQuery();
  });
};
