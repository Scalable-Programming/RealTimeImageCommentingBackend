import { Repository } from "redis-om";
import { CommentProps } from "../webSocket/types";
import { Comment, commentSchema } from "./entity";
import { client } from ".";

class CommentApi {
  #repo?: Repository<Comment>;

  getCursor() {
    if (!this.#repo) {
      throw new Error("No cursor");
    }

    return this.#repo;
  }

  async init() {
    this.#repo = client.fetchRepository(commentSchema);
    await this.getCursor().createIndex();
  }

  getAllComments = async () => {
    return this.getCursor().search().return.all();
  };

  getCommentById = async (id: string) => {
    return this.getCursor().fetch(id);
  };

  addNewComment = async ({ message, x, y }: CommentProps) => {
    return await this.getCursor().createAndSave({ x, y, message });
  };

  deleteComment = async (id: string) => {
    await this.getCursor().remove(id);
  };

  updateComment = async (id: string, { x, y, message }: CommentProps) => {
    const comment = (await this.getCommentById(id)) as any;
    comment.x = x;
    comment.y = y;
    comment.message = message;

    await this.getCursor().save(comment);
  };
}

const commentApi = new CommentApi();
commentApi.init();

export { commentApi };
