import express from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js';
import {getAllBoards,createBoard,createNote,createConnection,deleteBoard,deleteConnection,deleteNote,updateNote,renameBoard,boardChange} from '../controllers/sticky.controller.js';
const router = express.Router();
router.get("/boards",authMiddleware, getAllBoards)
router.post("/board",authMiddleware,createBoard) // tested
router.post("/board/:boardId/note", authMiddleware,createNote) //tested
router.post("/board/:boardId/connection",authMiddleware, createConnection) //tested
router.delete("/board/:boardId",authMiddleware,deleteBoard) //tested
router.delete("/board/:boardId/note/:noteId",authMiddleware, deleteNote)//tested
router.delete("/board/:boardId/connection/:connectionId",authMiddleware, deleteConnection) //tested
router.put("/board/:boardId/note/:noteId",authMiddleware, updateNote) //tested
router.put("/board/:boardId/rename",authMiddleware, renameBoard)//tested

router.get("/board/:boardId",authMiddleware, boardChange)
export default router;