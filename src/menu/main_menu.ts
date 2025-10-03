import { InlineKeyboard } from "grammy";

export const mainMenu = new InlineKeyboard()
  .text("Каталог", "click-category-1")
  .text("Корзина", "click-basket")
  .row()
  .text("Пополнить баланс", "click-balance");
