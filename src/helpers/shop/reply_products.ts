import type { Prisma } from "../../../generated/prisma";
import { shopMenu } from "../../menu/shop_menu";
import type { MyContext } from "../../types";

type ProductWithCategory = Prisma.ProductGetPayload<{
  include: { category: true };
}>;

export async function replyProducts(
  ctx: MyContext,
  page: number,
  products: ProductWithCategory[] | null
) {
  if (!products) return ctx.reply("Ошибка получения товаров.");

  ctx.session.productsPage = page;

  if (!products[0]) return ctx.reply("Ошибка получения категорий.");

  const text = `Наши товары категории ${products[0].category.name}:`;

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
