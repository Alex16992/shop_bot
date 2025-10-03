import { InlineKeyboard } from "grammy";
import type { MyContext } from "../types";

export function shopMenu(
  ctx: MyContext,
  products: { id: number; name: string }[]
) {
  const page = ctx.session.productsPage ?? 1;
  const keyboard = new InlineKeyboard();

  for (const product of products) {
    keyboard.text(product.name, `click-product-${product.id}`).row();
  }

  keyboard
    .text(
      "<",
      page !== 1 ? `click-products-${page > 1 ? page - 1 : 1}` : "click-empty"
    )
    .text(`${page}`)
    .text(">", `click-products-${page + 1}`)
    .row()
    .text("Профиль", "click-profile");

  return keyboard;
}
