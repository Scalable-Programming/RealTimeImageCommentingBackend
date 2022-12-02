import { Client } from "redis-om";
import { config } from "../../config";

const client = new Client();

const connect = async () => {
  await client.open(config.redisUrl);
};

connect();

export { client };
