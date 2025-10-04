import type { Bot } from "grammy";
import { getCategories } from "../helpers/shop/get_categories";
import { replyCategories } from "../helpers/shop/reply_categories";
import type { MyContext } from "../types";

export const catalogHears = (bot: Bot<MyContext>) => {
  bot.hears("🛍️ Каталог", async (ctx: MyContext) => {
    const categories = await getCategories(ctx, 1);
    await replyCategories(ctx, 1, categories);
  });
};
