import { InlineKeyboard } from "grammy";
import type { MyContext } from "../types";

export function shopMenu(
  ctx: MyContext,
  products: { id: number; name: string }[]
) {
  const page = ctx.session.productsPage ?? 1;
  const keyboard = new InlineKeyboard();

  products.forEach((product, i) => {
    keyboard.text(product.name, `click-product-${product.id}`);

    // после каждой второй кнопки переносим строку
    if ((i + 1) % 2 === 0) {
      keyboard.row();
    }
  });

  // если продуктов нечётное количество – переносим последнюю кнопку вниз
  if (products.length % 2 !== 0) {
    keyboard.row();
  }

  keyboard
    .text(
      "<",
      page !== 1 ? `click-products-${page > 1 ? page - 1 : 1}` : "click-empty"
    )
    .text(`${page}`, "click-empty")
    .text(">", `click-products-${page + 1}`)
    .row()
    .text("Категории", "click-categories-1")
    .row()
    .text("Профиль", "click-profile");

  return keyboard;
}
