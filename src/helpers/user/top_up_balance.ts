import prisma from "../../prisma";
import type { MyContext } from "../../types";

export const topUpBalance = async (ctx: MyContext) => {
  if (!ctx.from) {
    ctx.reply("Ошибка получения данных пользователя телеграм.");
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        telegramId: ctx.from.id.toString(),
      },
    });

    if (!user) return ctx.reply("Пользователь не найден.");

    await prisma.user.update({
      where: {
        telegramId: ctx.from.id.toString(),
      },
      data: {
        balance: {
          increment: 500,
        },
      },
    });

    await ctx.replyWithSticker(
      "CAACAgIAAxkBAAE8BNRo4QH03RsgiwSTKBSlCsJQZAGQFgACaAQAAsxUSQmwk4V28y2PrzYE"
    );

    await ctx.reply(
      `Ваш баланс пополнен на 500 рублей. Ваш баланс: ${user.balance.toNumber() + 500} руб.`
    );
  } catch (error) {
    console.error("Ошибка получения баланса:", error);
    ctx.reply("Ошибка получения баланса.");
  }
};
