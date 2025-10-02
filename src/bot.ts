import { conversations } from "@grammyjs/conversations";
import { hydrate } from "@grammyjs/hydrate";
import { Bot, GrammyError, HttpError, session } from "grammy";
import type { Product } from "../generated/prisma";
import { profileCallback } from "./callback/profile";
import { BOT_TOKEN } from "./check_env";
import { startCommand } from "./commands";
import { profileCommand } from "./commands/profile";
import { auth } from "./middlewares/auth.middleware";
import type { MyContext, SessionData } from "./types";

function sessionInitial(): SessionData {
  return {
    accessLevel: 0,
    data: {},
  };
}

const bot = new Bot<MyContext>(BOT_TOKEN);

bot.use(hydrate());

bot.use(
  session({
    initial: sessionInitial,
  })
);

bot.chatType("private").use(auth());

bot.use(conversations());

const products: Product[] = [];

startCommand(bot);

bot.command("products", (ctx) => ctx.reply(JSON.stringify(products)));

profileCommand(bot);

profileCallback(bot);

// Error handler
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

bot.start();
