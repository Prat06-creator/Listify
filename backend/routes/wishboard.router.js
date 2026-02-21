import express from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js';
import { getBoards, createBoard, updateBoard,deleteBoard, addItem, updateItem, deleteItem} from '../controllers/wishboard.controller.js';
const router = express.Router();
router.get("/",authMiddleware, getBoards)
router.post ("/board",authMiddleware,createBoard) //tested
router.put("/board/:boardId",authMiddleware, updateBoard)//tested
router.delete("/:boardId",authMiddleware,deleteBoard) //tested
router.post("/board/:boardId/item",authMiddleware, addItem)//tested
router.put("/board/:boardId/item/:itemId",authMiddleware, updateItem) 
router.delete("/board/:boardId/item/:itemId",authMiddleware, deleteItem) 
// router.post("/board/:boardId/text",authMiddleware, addText)
// router.delete("/board/:boardId/text/:textId",authMiddleware, deleteText)
export default router;