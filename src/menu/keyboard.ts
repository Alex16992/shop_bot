import { Keyboard } from "grammy";

export const keyboard = new Keyboard()
  .text("🛍️ Каталог")
  .row()
  .text("👤 Профиль")
  .text("🛠️ Поддержка")
  .row()
  .text("ℹ️ О нас")
  .row()
  .text("🌐 Сменить язык | Change language")
  .resized();
