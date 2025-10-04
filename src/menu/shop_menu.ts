import { InlineKeyboard } from "grammy";
import type { Product } from "../../generated/prisma";
import type { MyContext } from "../types";

export function shopMenu(ctx: MyContext, products: Product[]) {
  const page = ctx.session.productsPage ?? 1;
  const keyboard = new InlineKeyboard();

  products.forEach((product, i) => {
    keyboard
      .text(
        `${product.name} - ${product.price} руб.`,
        `click-product-${product.id}`
      )
      .row();
  });

  keyboard
    .text(
      "<",
      page !== 1 ? `click-products-${page > 1 ? page - 1 : 1}` : "click-empty"
    )
    .text(`${page}`, "click-empty")
    .text(">", `click-products-${page + 1}`)
    .row()
    .text("Категории", "click-categories-1");

  return keyboard;
}
