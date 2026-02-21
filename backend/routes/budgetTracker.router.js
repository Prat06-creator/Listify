import mongoose from 'mongoose';
import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { getBudgetTracker,addBudget, addExpense, deleteExpense } from '../controllers/budgetTracker.controller.js';

const router = Router();
router.get('/', authMiddleware, getBudgetTracker);
router.post('/budget',authMiddleware, addBudget);
router.post('/expense',authMiddleware, addExpense);
router.delete('/expense/:expenseId',authMiddleware, deleteExpense);
export default router;