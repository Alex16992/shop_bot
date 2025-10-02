import type { Middleware } from "grammy";
import { UserDbService } from "../services/user";
import type { MyContext } from "../types";

export function auth(): Middleware<MyContext> {
  return async (ctx, next) => {
    if (ctx.session.accessLevel === undefined || !ctx.session.accessLevel) {
      if (!ctx.from) {
        await ctx.reply("auth.not-user");
        return;
      }

      // Авторизация или регистрация пользователя
      const accessLevel = await UserDbService.authOrCreateUser(
        ctx.from.id.toString(),
        ctx.from?.username
      );

      if (typeof accessLevel === "number") {
        // Устанавливаем уровень доступа пользователя в сессию
        ctx.session.accessLevel = accessLevel;
        await next();
      } else {
        await ctx.reply("auth.not.user");
      }
    } else {
      // Пользователь уже авторизован, продолжаем выполнение
      await next();
    }
  };
}
