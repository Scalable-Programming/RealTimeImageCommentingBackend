import { connectWebSocket } from "./services/webSocket/index";
import Express from "express";
import { config } from "./config";

const app = Express();
const server = app.listen(config.port);

connectWebSocket(server);
