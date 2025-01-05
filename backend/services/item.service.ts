import { dbPool } from "../utils/db";
import { Item, itemSchema } from "../schemes/item.scheme";
import { ResultSetHeader } from "mysql2";

export const getAllItems = async (): Promise<Item[] | null> => {
  const [rows] = await dbPool.execute("SELECT * FROM items;");

  const items = rows as Item[];

  return items;
};

export const getItemById = async (id: number): Promise<Item | null> => {
  const [rows] = await dbPool.execute("SELECT * FROM items WHERE id=?;", [id]);

  const items = rows as Item[];

  return items.length > 0 ? items[0] : null;
};

export const createItem = async (item: Item) => {
  const [results] = await dbPool.execute<ResultSetHeader>(
    `
    INSERT INTO items (name, description, price) VALUES (?, ?, ?)
  `,
    [item.name, item.description, item.price]
  );

  return results;
};

export const updateItem = async (id: Number, item: Item) => {
  const [results] = await dbPool.execute<ResultSetHeader>(
    `
    UPDATE items SET name=?, description=?, price=? WHERE id=?
  `,
    [item.name, item.description, item.price, id]
  );

  return results;
};

export const deleteItem = async (id: Number) => {
  const [results] = await dbPool.execute<ResultSetHeader>(
    `DELETE FROM items WHERE id=?`,
    [id]
  );

  return results;
};
