import { InputFile } from "grammy";
import type { Prisma } from "../../../generated/prisma";
import { productMenu } from "../../menu/product_menu";
import type { MyContext } from "../../types";

// Тип продукта с категорией
type ProductWithCategory = Prisma.ProductGetPayload<{
  include: { category: true };
}>;

export async function replyProduct(
  ctx: MyContext,
  product: ProductWithCategory | null
) {
  if (!product) return ctx.reply("Ошибка получения товара.");

  const text = `
${product.name}
${product.description}

Цена: ${product.price} руб.
Категория: ${product.category.name}`;

  if (!ctx.callbackQuery) {
    await ctx.reply(text, {
      reply_markup: productMenu(ctx, product.id),
    });

    return;
  }

  await ctx.editMessageMedia(
    {
      type: "photo",
      media: new InputFile(`src/images/${product.category.image}`),
      caption: text,
    },
    {
      reply_markup: productMenu(ctx, product.id),
    }
  );
  await ctx.answerCallbackQuery();
}
