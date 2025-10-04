import { InlineKeyboard } from "grammy";

export const mainMenu = new InlineKeyboard()
  .text("История", "click-history")
  .row()
  .text("Пополнить баланс", "click-balance");
