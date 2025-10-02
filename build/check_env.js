import { config } from "dotenv";
config();
const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN)
    throw new Error("BOT_TOKEN не указан");
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL)
    throw new Error("DATABASE_URL не указан");
export { BOT_TOKEN, DATABASE_URL };
//# sourceMappingURL=check_env.js.map