export enum EventListenerNames {
  GET_ALL_OTHER_CURSOR = "getAllOtherCursors",
  CURSOR_MOVED = "cursorMoved",
  SEND_NEW_CURSOR_POSITION = "sendNewCursorPosition",
  COMMENT_ADDED = "commentAdded",
  SEND_NEW_COMMENT = "sendNewComment",
  SEND_ALL_OTHER_CURSORS = "sendAllOtherCursors",
}

interface XY {
  x: number;
  y: number;
}

export interface CursorProps extends XY {}

export interface CommentProps extends XY {
  message: string;
}
