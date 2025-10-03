import { InlineKeyboard } from "grammy";

export const mainMenu = new InlineKeyboard()
  .text("Каталог", "click-categories-1")
  .text("История", "click-history")
  .row()
  .text("Пополнить баланс", "click-balance");
