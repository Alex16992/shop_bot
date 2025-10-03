import { conversations } from "@grammyjs/conversations";
import { hydrate } from "@grammyjs/hydrate";
import { Bot, GrammyError, HttpError, session } from "grammy";
import type { Product } from "../generated/prisma";
import { productsCallback } from "./callback/products";
import { profileCallback } from "./callback/profile";
import { BOT_TOKEN } from "./check_env";
import { startCommand } from "./commands";
import { profileCommand } from "./commands/profile";
import { handleError } from "./error";
import { auth } from "./middlewares/auth.middleware";
import type { MyContext, SessionData } from "./types";

function sessionInitial(): SessionData {
  return {
    accessLevel: 0,
    productsPage: 1,
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

startCommand(bot);

profileCommand(bot);

profileCallback(bot);
productsCallback(bot);

// Error handler
handleError(bot);

bot.start();
