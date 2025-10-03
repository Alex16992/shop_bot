import type { Category } from "../../../generated/prisma";
import { shopMenu } from "../../menu/shop_menu";
import type { MyContext } from "../../types";

export async function replyCategory(
  ctx: MyContext,
  page: number,
  categories: Category[] | null
) {
  if (!categories) return ctx.reply("Ошибка получения категорий.");

  ctx.session.categoriesPage = page;

  const text = `Наши категории:`;

  if (!ctx.callbackQuery) {
    await ctx.reply(text, {
      reply_markup: shopMenu(ctx, categories),
    });

    await ctx.answerCallbackQuery();

    return;
  }

  await ctx.callbackQuery.message?.editText(text, {
    reply_markup: shopMenu(ctx, categories),
  });
}
