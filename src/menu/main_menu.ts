import { InlineKeyboard } from "grammy";

export const mainMenu = new InlineKeyboard()

  .text("💳 Пополнить баланс", "click-balance")
  .row()
  .text("🛒 История", "click-history-1")
  .text("🎫 Реферальная программа", "click-referral");
