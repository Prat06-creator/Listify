import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { getEntries, createEntry, updateEntry,deleteEntry } from '../controllers/braindump.controller.js';

const router = express.Router();
function safeRoute(method, path, handler) {
  if (!path || typeof path !== "string") {
    console.error(`🚨 Invalid route detected: method=${method}, path=${path}`);
    return; // skip attaching invalid routes
  }
  console.log(`Registering route: ${method.toUpperCase()} ${path}`);
  router[method](path, handler);
}
safeRoute("get", '/brainDump', authMiddleware, getEntries);
safeRoute("post",'/entry', authMiddleware, createEntry);
safeRoute("put",'/brainDump/:id', authMiddleware, updateEntry);
safeRoute("delete",'/brainDump/:id', authMiddleware, deleteEntry);
export default router;