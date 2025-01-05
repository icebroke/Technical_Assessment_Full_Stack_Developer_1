import { Request, Response, NextFunction } from "express";
import {
  createItem,
  deleteItem,
  getAllItems,
  getItemById,
  updateItem,
} from "../services/item.service";
import { itemSchema } from "../schemes/item.scheme";
import { z } from "zod";

export const getAllItemsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await getAllItems();

    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};

export const getItemByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID format" });
    }

    const item = await getItemById(id);

    if (!item) {
      res.status(404).json({ message: "Item not found." });
    }

    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
};

export const createItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = itemSchema.parse(req.body);

    const result = await createItem(item);

    const newId = result.insertId;

    res.status(200).json({ message: "Successfully Saved.", id: newId });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res
        .status(400)
        .json({ message: "Data received is not valid.", errors: err.errors });
    } else {
      next(err);
    }
  }
};

export const updateItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID format" });
    }

    const item = itemSchema.parse(req.body);

    const result = await updateItem(id, item);

    const affectedRows = result.affectedRows;

    if (affectedRows > 0) {
      res.status(200).json({ message: "Successfully Saved." });
    } else {
      res.status(404).json({ message: `The Item with id ${id}, not found.` });
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      res
        .status(400)
        .json({ message: "Data received is not valid.", errors: err.errors });
    } else {
      next(err);
    }
  }
};

export const deleteItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID format" });
    }

    const result = await deleteItem(id);

    const affectedRows = result.affectedRows;

    if (affectedRows > 0) {
      res.status(200).json({ message: "Successfully Deleted." });
    } else {
      res.status(404).json({ message: `The Item with id ${id}, not found.` });
    }
  } catch (err) {
    next(err);
  }
};
