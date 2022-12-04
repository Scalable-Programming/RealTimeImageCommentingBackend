import { Entity, Schema } from "redis-om";

export class Cursor extends Entity {}
export class Comment extends Entity {}

export const cursorSchema = new Schema(Cursor, {
  x: { type: "string" },
  y: { type: "string" },
});

export const commentSchema = new Schema(Comment, {
  createdAt: { type: "date" },
  message: { type: "string" },
  x: { type: "string" },
  y: { type: "string" },
});
