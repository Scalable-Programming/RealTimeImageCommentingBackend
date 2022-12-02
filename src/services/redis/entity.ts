import { Entity, Schema } from "redis-om";

export class Cursor extends Entity {}
export class Comment extends Entity {}

export const cursorSchema = new Schema(Cursor, {
  x: { type: "number" },
  y: { type: "number" },
});

export const commentSchema = new Schema(Comment, {
  createdAt: { type: "date" },
  message: { type: "string" },
  x: { type: "number" },
  y: { type: "number" },
});
