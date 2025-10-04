import { InlineKeyboard } from "grammy";
import type { MyContext } from "../types";

export function productMenu(ctx: MyContext, productId: number) {
  const page = ctx.session.productsPage ?? 1;
  const keyboard = new InlineKeyboard();

  keyboard
    .text("Купить", `click-product-buy-${productId}`)
    .row()
    .text("Назад", `click-products-${page}`);

  return keyboard;
}
