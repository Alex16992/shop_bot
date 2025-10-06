import { conversations } from "@grammyjs/conversations";
import { hydrate } from "@grammyjs/hydrate";
import { Bot, session } from "grammy";
import { balanceCallback, buyProductCallback, categoriesCallback, categoryCallback, emptyCallback, historyCallback, productCallback, productsCallback, profileCallback, } from "./callback";
import { BOT_TOKEN } from "./check_env";
import { profileCommand, startCommand } from "./commands";
import { handleError } from "./error";
import { aboutUsHears, catalogHears, profileHears, supportHears, } from "./hears";
import { auth } from "./middlewares/auth.middleware";
function sessionInitial() {
    return {
        accessLevel: 0,
        productsPage: 1,
        categoriesPage: 1,
        historyPage: 1,
        categoryId: 0,
        data: {},
    };
}
const bot = new Bot(BOT_TOKEN);
bot.use(hydrate());
bot.use(session({
    initial: sessionInitial,
}));
bot.chatType("private").use(auth());
bot.use(conversations());
startCommand(bot);
profileCommand(bot);
catalogHears(bot);
profileHears(bot);
aboutUsHears(bot);
supportHears(bot);
categoryCallback(bot);
categoriesCallback(bot);
profileCallback(bot);
productsCallback(bot);
productCallback(bot);
emptyCallback(bot);
balanceCallback(bot);
buyProductCallback(bot);
historyCallback(bot);
// Error handler
handleError(bot);
bot.start();
//# sourceMappingURL=bot.js.map