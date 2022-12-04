import { connectWebSocket } from "./services/webSocket/index";
import cors from "cors";
import Express from "express";
import { config } from "./config";

const app = Express();
app.use(cors({ origin: config.frontEnd }));
const server = app.listen(config.port);

connectWebSocket(server);
