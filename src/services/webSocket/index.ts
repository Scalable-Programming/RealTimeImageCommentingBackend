import { Server } from "http";
import { config } from "../../config";
import { Server as SockerServer } from "socket.io";
import {
  registerNewComment,
  registerNewCursorPosition,
  registerSendInitialData,
} from "./eventListeners";

export const connectWebSocket = (server: Server) => {
  const io = new SockerServer(server, { cors: { origin: [config.frontEnd] } });

  io.on("connection", async (socket) => {
    registerNewComment(socket);
    registerNewCursorPosition(socket);
    registerSendInitialData(socket);
  });
};
