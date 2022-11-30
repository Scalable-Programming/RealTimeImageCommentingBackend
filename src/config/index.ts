import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const config = {
    redisPw: process.env.REDIS_PW,
    port: +(process.env.PORT as string),
    frontEnd: process.env.FRONTEND_URL as string,
};
