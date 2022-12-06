import { Repository } from "redis-om";
import { CommentProps } from "../webSocket/types";
import { Comment, commentSchema } from "./entity";
import { client } from ".";

class CommentApi {
  #repo?: Repository<Comment>;

  getRepo() {
    if (!this.#repo) {
      throw new Error("No cursor");
    }

    return this.#repo;
  }

  async init() {
    this.#repo = client.fetchRepository(commentSchema);
    await this.getRepo().createIndex();
  }

  getAllComments = async (cursorId: string) => {
    return this.getRepo()
      .search()
      .where("cursorId")
      .is.not.equalTo(cursorId)
      .return.all();
  };

  getCommentById = async (id: string) => {
    return this.getRepo().fetch(id);
  };

  addNewComment = async ({ message, x, y, cursorId }: CommentProps) => {
    return await this.getRepo().createAndSave({
      x,
      y,
      message,
      cursorId,
      createdAt: new Date(),
    });
  };

  deleteComment = async (id: string) => {
    await this.getRepo().remove(id);
  };

  updateComment = async (id: string, { x, y, message }: CommentProps) => {
    const comment = (await this.getCommentById(id)) as any;
    comment.x = x;
    comment.y = y;
    comment.message = message;

    await this.getRepo().save(comment);
  };
}

const commentApi = new CommentApi();
commentApi.init();

export { commentApi };
