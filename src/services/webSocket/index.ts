import { Server } from "http";
import { config } from "../../config";
import { Server as SockerServer } from "socket.io";
import {
  registerNewComment,
  createUpdateCursor,
  sendInitialData,
  registerOnDisconect,
  addCursorOnConnect,
  sendAllComments,
} from "./eventListeners";

export const connectWebSocket = (server: Server) => {
  const io = new SockerServer(server, { cors: { origin: [config.frontEnd] } });

  io.on("connection", async (socket) => {
    await addCursorOnConnect(socket);
    await registerNewComment(socket);
    await createUpdateCursor(socket);
    await registerOnDisconect(socket);
    await sendInitialData(socket);
    await sendAllComments(socket);
  });
};
