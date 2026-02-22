import express from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js';
import { getBoards, createBoard, updateBoard,deleteBoard, addItem, updateItem, deleteItem} from '../controllers/wishboard.controller.js';
const router = express.Router();
function safeRoute(method, path, handler) {
  if (!path || typeof path !== "string") {
    console.error(`🚨 Invalid route detected: method=${method}, path=${path}`);
    return; // skip attaching invalid routes
  }
  console.log(`Registering route: ${method.toUpperCase()} ${path}`);
  router[method](path, handler);
}
safeRoute("get","/",authMiddleware, getBoards)
safeRoute("post","/board",authMiddleware,createBoard) //tested
safeRoute("put","/board/:boardId",authMiddleware, updateBoard)//tested
safeRoute("delete","/board/:boardId",authMiddleware,deleteBoard) //tested
safeRoute("post","/board/:boardId/item",authMiddleware, addItem)//tested
safeRoute("put","/board/:boardId/item/:itemId",authMiddleware, updateItem) 
safeRoute("delete","/board/:boardId/item/:itemId",authMiddleware, deleteItem) 
// router.post("/board/:boardId/text",authMiddleware, addText)
// router.delete("/board/:boardId/text/:textId",authMiddleware, deleteText)
export default router;