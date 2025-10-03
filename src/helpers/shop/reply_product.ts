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

  if (!ctx.callbackQuery) {
    await ctx.reply(
      `
${product.name}
${product.description}

Цена: ${product.price} руб.
Категория: ${product.category.name}`,
      {
        reply_markup: productMenu(ctx, product.id),
      }
    );

    await ctx.answerCallbackQuery();

    return;
  }

  await ctx.callbackQuery.message?.editText(
    `
${product.name}
${product.description}

Цена: ${product.price} руб.
Категория: ${product.category.name}`,
    {
      reply_markup: productMenu(ctx, product.id),
    }
  );
}
