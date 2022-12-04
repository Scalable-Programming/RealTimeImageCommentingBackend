import { client } from ".";

export const getCursorIdBySocketId = async (socketId: string) =>
  client.get(socketId);

export const setCursorIdBySocketId = async (
  socketId: string,
  cursorId: string
) => client.set(socketId, cursorId);

export const deleteCursorIdBySocketId = async (socketId: string) =>
  client.unlink(socketId);
