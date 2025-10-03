import { type Bot, GrammyError, HttpError } from "grammy";
import type { MyContext } from "./types";

export function handleError(bot: Bot<MyContext>) {
  bot.catch((err) => {
    const ctx = err.ctx;
    const updateId = ctx.update.update_id;

    console.error(`Ошибка при обработке обновления ${updateId}`, {
      context: { update_id: updateId },
    });

    const e = err.error;
    if (e instanceof GrammyError) {
      console.error("Ошибка в запросе", {
        error: e,
        context: { description: e.description },
      });
    } else if (e instanceof HttpError) {
      console.error("Не удалось связаться с Telegram", {
        error: e,
      });
    } else {
      console.error("Неизвестная ошибка", {
        error: e instanceof Error ? e : new Error(String(e)),
      });
    }
  });
}
