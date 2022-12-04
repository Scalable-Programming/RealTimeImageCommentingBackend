import { Repository } from "redis-om";
import { CursorProps } from "../webSocket/types";
import { Cursor, cursorSchema } from "./entity";
import { client } from ".";

class CursorApi {
  #repo?: Repository<Cursor>;

  getCursor() {
    if (!this.#repo) {
      throw new Error("No cursor");
    }

    return this.#repo;
  }

  async init() {
    this.#repo = client.fetchRepository(cursorSchema);
    await this.getCursor().createIndex();
  }

  deleteCursor = async (id: string) => {
    await this.getCursor().remove(id);
  };

  updateCursor = async (id: string, { x, y }: CursorProps) => {
    const cursor = (await this.getCursorById(id)) as any;
    cursor.x = x;
    cursor.y = y;

    await this.getCursor().save(cursor);

    return cursor;
  };

  getCursorById = async (id: string) => {
    return this.getCursor().fetch(id);
  };

  getAllCursors = async () => {
    return this.getCursor().search().return.all();
  };

  addNewCursor = async ({ x, y }: CursorProps) => {
    return await this.getCursor().createAndSave({ x, y });
  };
}

const cursorApi = new CursorApi();
cursorApi.init();

export { cursorApi };
