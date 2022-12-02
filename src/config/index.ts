import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const config = {
  port: +(process.env.PORT as string),
  frontEnd: process.env.FRONTEND_URL as string,
  redisUrl: process.env.REDIS_URL as string,
};
