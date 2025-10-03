import { InlineKeyboard } from "grammy";
import type { MyContext } from "../types";

export function categoryMenu(
  ctx: MyContext,
  categories: { id: number; name: string }[]
) {
  const page = ctx.session.categoriesPage ?? 1;
  const keyboard = new InlineKeyboard();

  categories.forEach((category, i) => {
    keyboard.text(category.name, `click-category-${category.id}`);

    // после каждой второй кнопки переносим строку
    if ((i + 1) % 2 === 0) {
      keyboard.row();
    }
  });

  // если категорий нечётное количество – переносим последнюю кнопку вниз
  if (categories.length % 2 !== 0) {
    keyboard.row();
  }

  keyboard
    .text(
      "<",
      page !== 1 ? `click-categories-${page > 1 ? page - 1 : 1}` : "click-empty"
    )
    .text(`${page}`, "click-empty")
    .text(">", `click-categories-${page + 1}`)
    .row()
    .text("Профиль", "click-profile");

  return keyboard;
}
