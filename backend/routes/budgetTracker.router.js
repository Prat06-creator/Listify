import mongoose from 'mongoose';
import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { getBudgetTracker,addBudget, addExpense, deleteExpense } from '../controllers/budgetTracker.controller.js';

const router = Router();
function safeRoute(method, path, handler) {
  if (!path || typeof path !== "string") {
    console.error(`🚨 Invalid route detected: method=${method}, path=${path}`);
    return; // skip attaching invalid routes
  }
  console.log(`Registering route: ${method.toUpperCase()} ${path}`);
  router[method](path, handler);
}
safeRoute('get','/', authMiddleware, getBudgetTracker);
safeRoute('post','/budget',authMiddleware, addBudget);
safeRoute('post','/expense',authMiddleware, addExpense);
safeRoute('delete','/expense/:expenseId',authMiddleware, deleteExpense);
export default router;