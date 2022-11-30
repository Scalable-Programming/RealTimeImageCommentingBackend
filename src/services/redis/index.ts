import { createClient } from "redis";
import { config } from "../../config";

const client = createClient({ password: config.redisPw });

client.on("error", (err) => console.log("Redis Client Error", err));

const connect = async () => {
    await client.connect();
};

connect();

export { client };