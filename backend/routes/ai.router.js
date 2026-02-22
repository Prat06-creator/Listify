import express from "express";
import { chatWithAI } from "../controllers/aiController.js";

const router = express.Router();
function safeRoute(method, path, handler) {
  if (!path || typeof path !== "string") {
    console.error(`🚨 Invalid route detected: method=${method}, path=${path}`);
    return; // skip attaching invalid routes
  }
  console.log(`Registering route: ${method.toUpperCase()} ${path}`);
  router[method](path, handler);
}
safeRoute("post","/chat", chatWithAI);

export default router;

    