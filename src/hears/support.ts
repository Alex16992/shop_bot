import type { Bot } from "grammy";
import type { MyContext } from "../types";

export const supportHears = (bot: Bot<MyContext>) => {
  bot.hears("🛠️ Поддержка", async (ctx: MyContext) => {
    ctx.reply(`
Если у вас возникли вопросы или проблемы, вы можете обратиться в нашу службу поддержки. Мы готовы помочь вам 24/7.

Контактные данные по вопросам покупки и аккаунтов:
- 💬 Telegram: @GameAccountsBotSupport

Контактные данные по вопросам рекламы в боте:
- 💬 Telegram: @GameAccountsBotAdvertising

Мы ценим ваше мнение и всегда готовы улучшать наш сервис!
        `);
    await ctx.answerCallbackQuery();
  });
};
