import type { Product } from "../../../generated/prisma";
import { shopMenu } from "../../menu/shop_menu";
import type { MyContext } from "../../types";

export async function replyProducts(
  ctx: MyContext,
  page: number,
  products: Product[] | null
) {
  if (!products) return ctx.reply("Ошибка получения товаров.");

  ctx.session.productsPage = page;

  const text = `Наши товары:`;

  if (!ctx.callbackQuery) {
    await ctx.reply(text, {
      reply_markup: shopMenu(ctx, products),
    });

    await ctx.answerCallbackQuery();

    return;
  }

  await ctx.callbackQuery.message?.editText(text, {
    reply_markup: shopMenu(ctx, products),
  });
}
