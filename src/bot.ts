import { conversations } from "@grammyjs/conversations";
import { hydrate } from "@grammyjs/hydrate";
import { Bot, session } from "grammy";
import {
  categoriesCallback,
  productCallback,
  productsCallback,
  profileCallback,
} from "./callback";
import { balanceCallback } from "./callback/balance";
import { categoryCallback } from "./callback/category";
import { emptyCallback } from "./callback/empty";
import { BOT_TOKEN } from "./check_env";
import { profileCommand, startCommand } from "./commands";
import { handleError } from "./error";
import { catalogHears } from "./hears/catalog";
import { profileHears } from "./hears/profile";
import { auth } from "./middlewares/auth.middleware";
import type { MyContext, SessionData } from "./types";

function sessionInitial(): SessionData {
  return {
    accessLevel: 0,
    productsPage: 1,
    categoriesPage: 1,
    categoryId: 0,
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

catalogHears(bot);
profileHears(bot);

categoryCallback(bot);
categoriesCallback(bot);
profileCallback(bot);
productsCallback(bot);
productCallback(bot);
emptyCallback(bot);
balanceCallback(bot);

// Error handler
handleError(bot);

bot.start();
