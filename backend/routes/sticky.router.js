import express from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js';
import {getAllBoards,createBoard,createNote,createConnection,deleteBoard,deleteConnection,deleteNote,updateNote,renameBoard,boardChange} from '../controllers/sticky.controller.js';
const router = express.Router();
function safeRoute(method, path, handler) {
  if (!path || typeof path !== "string") {
    console.error(`🚨 Invalid route detected: method=${method}, path=${path}`);
    return; // skip attaching invalid routes
  }
  console.log(`Registering route: ${method.toUpperCase()} ${path}`);
  router[method](path, handler);
}
safeRoute("get","/boards",authMiddleware, getAllBoards)
safeRoute("post","/board",authMiddleware,createBoard) // tested
safeRoute("post","/board/:boardId/note", authMiddleware,createNote) //tested
safeRoute("post","/board/:boardId/connection",authMiddleware, createConnection) //tested
safeRoute("delete","/board/:boardId",authMiddleware,deleteBoard) //tested
safeRoute("delete","/board/:boardId/note/:noteId",authMiddleware, deleteNote)//tested
safeRoute("delete","/board/:boardId/connection/:connectionId",authMiddleware, deleteConnection) //tested
safeRoute("put","/board/:boardId/note/:noteId",authMiddleware, updateNote) //tested
safeRoute("put","/board/:boardId/rename",authMiddleware, renameBoard)//tested

safeRoute("get","/board/:boardId",authMiddleware, boardChange)
export default router;