import { Server } from "socket.io";
import Express from "express";
import { config } from "./config";

const app = Express();
const server = app.listen(config.port);

const io = new Server(server, { cors: { origin: [config.frontEnd] } });

io.on("connection", async (socket) => {
    console.log("socket");
});
