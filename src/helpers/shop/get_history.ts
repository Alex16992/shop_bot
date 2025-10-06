import prisma from "../../prisma";
import type { MyContext } from "../../types";

export const getHistory = async (ctx: MyContext, page: number) => {
  if (!ctx.from) {
    ctx.reply("Ошибка получения данных пользователя телеграм.");
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { telegramId: ctx.from.id.toString() },
  });

  if (!user) {
    ctx.reply("Пользователь не найден.");
    return null;
  }

  return prisma.history.findMany({
    where: { userId: user.id },
    skip: (page - 1) * 10,
    take: 10,
    orderBy: {
      createdAt: "asc",
    },
    include: {
      product: true,
    },
  });
};
