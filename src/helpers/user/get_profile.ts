import prisma from "../../prisma";
import type { MyContext } from "../../types";

export const getProfile = async (ctx: MyContext) => {
  if (!ctx.from) return "Ошибка получения данных пользователя телеграм.";

  const user = await prisma.user.findUnique({
    where: { telegramId: ctx.from.id.toString() },
  });

  if (!user) return "Пользователь не найден в базе данных.";

  const accessLevels: Record<number, string> = {
    0: "Пользователь",
    1: "Модератор",
    2: "Администратор",
  };

  const roleName = accessLevels[user.accessLevel] ?? "Неизвестно";

  return `
Ваш профиль:
username: ${user.username ?? "null"}
accessLevel: ${roleName}
Дата регистрации: ${user.createdAt.toLocaleString("ru-RU")}
      `;
};
