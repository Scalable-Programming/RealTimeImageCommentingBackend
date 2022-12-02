import { Socket } from "socket.io";
import { commentApi } from "../redis/commentApi";
import { cursorApi } from "../redis/cursorApi";
import { EventListenerNames } from "./types";

export const registerSendInitialData = async (socket: Socket) => {
  socket.on(EventListenerNames.GET_ALL_OTHER_CURSOR, async () => {
    const allCursors = await cursorApi.getAllCursors();
    socket.broadcast.emit(
      EventListenerNames.SEND_ALL_OTHER_CURSORS,
      allCursors
    );
  });
};

export const registerNewCursorPosition = async (socket: Socket) => {
  socket.on(EventListenerNames.CURSOR_MOVED, async ({ x, y }) => {
    const newCursor = await cursorApi.addNewCursor({ x, y });
    socket.broadcast.emit(
      EventListenerNames.SEND_NEW_CURSOR_POSITION,
      newCursor
    );
  });
};

export const registerNewComment = async (socket: Socket) => {
  socket.on(EventListenerNames.COMMENT_ADDED, async ({ x, y, message }) => {
    const newComment = await commentApi.addNewComment({ x, y, message });
    socket.broadcast.emit(EventListenerNames.SEND_NEW_COMMENT, newComment);
  });
};
