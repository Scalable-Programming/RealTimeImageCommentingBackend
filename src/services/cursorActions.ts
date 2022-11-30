import { client } from "./redis";

const CURSOR_KEY = "cursors";

export const getAllCursors = async () => client.hGetAll(CURSOR_KEY);
