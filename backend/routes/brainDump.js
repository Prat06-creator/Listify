import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { getEntries, createEntry, updateEntry,deleteEntry } from '../controllers/braindump.controller.js';

const router = express.Router();
router.get ('/brainDump', authMiddleware, getEntries);
router.post ('/entry', authMiddleware, createEntry);
router.put ('/brainDump/:id', authMiddleware, updateEntry);
router.delete ('/brainDump/:id', authMiddleware, deleteEntry);
export default router;