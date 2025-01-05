import {Router} from "express";
import {createItemController, deleteItemController, getAllItemsController, getItemByIdController, updateItemController} from "../controllers/item.controller";

const router = Router();

router.get('/', getAllItemsController);
router.get('/:id', getItemByIdController);
router.post("/", createItemController);
router.put("/:id", updateItemController);
router.delete("/:id", deleteItemController);

export default router;