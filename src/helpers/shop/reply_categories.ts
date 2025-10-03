import type { Category } from "../../../generated/prisma";
import { categoryMenu } from "../../menu/category_menu";
import type { MyContext } from "../../types";

export async function replyCategories(
  ctx: MyContext,
  page: number,
  categories: Category[] | null
) {
  if (!categories) return ctx.reply("Ошибка получения категорий.");

  ctx.session.categoriesPage = page;

  const text = `Наши категории:`;

  if (!ctx.callbackQuery) {
    await ctx.reply(text, {
      reply_markup: categoryMenu(ctx, categories),
    });

    await ctx.answerCallbackQuery();

    return;
  }

  await ctx.callbackQuery.message?.editText(text, {
    reply_markup: categoryMenu(ctx, categories),
  });
}
