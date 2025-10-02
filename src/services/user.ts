import prisma from "../prisma";

class UserDbServiceClass {
  async authOrCreateUser(
    telegramId: string,
    username: string | undefined
  ): Promise<number | undefined> {
    try {
      let userRequest = await prisma.user.findUnique({
        where: {
          telegramId,
        },
      });

      if (!userRequest || userRequest === null) {
        userRequest = await prisma.user.create({
          data: {
            accessLevel: 0,
            telegramId,
            username: username ?? null,
          },
        });
      }

      // Дополнительно проверяем, поменял ли username пользователь
      if (userRequest.username !== username) {
        console.info(
          `Пользователь ${userRequest.id} изменил имя пользователя с ${userRequest.username} на ${username}`,
          {
            context: {
              id: userRequest.id,
              telegramId,
              username,
            },
          }
        );
        await prisma.user.update({
          where: {
            telegramId,
          },
          data: {
            username: username ?? null,
          },
        });
      }

      return userRequest?.accessLevel ?? 0;
    } catch (error) {
      console.error("Ошибка при авторизации пользователя", {
        error: error,
        context: {
          telegramId,
          username,
        },
      });
    }
  }
}

export const UserDbService = new UserDbServiceClass();
