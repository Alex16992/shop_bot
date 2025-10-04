import { InputFile } from "grammy";
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
    await ctx.replyWithPhoto(new InputFile("src/images/without_image.jpg"), {
      caption: text,
      reply_markup: categoryMenu(ctx, categories),
    });
  } else {
    await ctx.editMessageMedia(
      {
        type: "photo",
        media: new InputFile("src/images/without_image.jpg"),
        caption: text,
      },
      {
        reply_markup: categoryMenu(ctx, categories),
      }
    );
    await ctx.answerCallbackQuery();
  }
}
