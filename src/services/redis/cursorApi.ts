import { Repository } from "redis-om";
import { CursorProps } from "../webSocket/types";
import { Cursor, cursorSchema } from "./entity";
import { client } from ".";

class CursorApi {
  #repo?: Repository<Cursor>;

  getRepo() {
    if (!this.#repo) {
      throw new Error("No cursor");
    }

    return this.#repo;
  }

  async init() {
    this.#repo = client.fetchRepository(cursorSchema);
    await this.getRepo().createIndex();
  }

  deleteCursor = async (id: string) => {
    await this.getRepo().remove(id);
  };

  updateCursor = async (id: string, { x, y }: CursorProps) => {
    const cursor = (await this.getCursorById(id)) as any;
    cursor.x = x;
    cursor.y = y;

    await this.getRepo().save(cursor);

    return cursor;
  };

  getCursorById = async (id: string) => {
    return this.getRepo().fetch(id);
  };

  getAllCursors = async () => {
    return this.getRepo().search().return.all();
  };

  addNewCursor = async ({ x, y }: CursorProps) => {
    return await this.getRepo().createAndSave({ x, y });
  };
}

const cursorApi = new CursorApi();
cursorApi.init();

export { cursorApi };
