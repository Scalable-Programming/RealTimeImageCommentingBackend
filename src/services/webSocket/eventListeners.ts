import { Socket } from "socket.io";
import { commentApi } from "../redis/commentApi";
import { cursorApi } from "../redis/cursorApi";
import {
  deleteCursorIdBySocketId,
  getCursorIdBySocketId,
  setCursorIdBySocketId,
} from "../redis/cursorSocketApi";
import { Cursor } from "../redis/entity";
import { EventListenerNames } from "./types";

export const sendInitialData = async (socket: Socket) => {
  const currentCursorId = await getCursorIdBySocketId(socket.id);

  const allCursors = await cursorApi.getAllCursors();
  socket.emit(
    EventListenerNames.SEND_ALL_OTHER_CURSORS,
    allCursors.filter(({ entityId }) => entityId !== currentCursorId)
  );
};

export const createUpdateCursor = async (socket: Socket) => {
  socket.on(EventListenerNames.CURSOR_MOVED, async ({ x, y }) => {
    let cursor: Cursor | undefined;
    let cursorId = await getCursorIdBySocketId(socket.id);

    if (!cursorId) {
      return;
    }

    cursor = await cursorApi.updateCursor(cursorId, { x, y });

    socket.broadcast.emit(EventListenerNames.SEND_NEW_CURSOR_POSITION, cursor);
  });
};

export const registerNewComment = async (socket: Socket) => {
  socket.on(EventListenerNames.COMMENT_ADDED, async ({ x, y, message }) => {
    const newComment = await commentApi.addNewComment({ x, y, message });
    socket.broadcast.emit(EventListenerNames.SEND_NEW_COMMENT, newComment);
  });
};

export const registerOnDisconect = async (socket: Socket) => {
  socket.on("disconnect", async () => {
    const cursorId = await getCursorIdBySocketId(socket.id);
    await deleteCursorIdBySocketId(socket.id);

    if (!cursorId) {
      return;
    }

    await cursorApi.deleteCursor(cursorId);

    socket.broadcast.emit(EventListenerNames.CURSOR_DISCONNECT, cursorId);
  });
};

export const addCursorOnConnect = async (socket: Socket) => {
  const cursor = await cursorApi.addNewCursor({ x: "0%", y: "0%" });
  await setCursorIdBySocketId(socket.id, cursor.entityId);
};
