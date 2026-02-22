import express from 'express'
import {login,signup} from '../controllers/auth.controller.js'
import { logout } from '../controllers/auth.controller.js';
import { verifyEmail } from '../controllers/auth.controller.js';
import {getUserProfile} from '../controllers/auth.controller.js';
const router = express.Router();
function safeRoute(method, path, handler) {
  if (!path || typeof path !== "string") {
    console.error(`🚨 Invalid route detected: method=${method}, path=${path}`);
    return; // skip attaching invalid routes
  }
  console.log(`Registering route: ${method.toUpperCase()} ${path}`);
  router[method](path, handler);
}

// Define routes
safeRoute("post", "/signup", signup);
safeRoute("post", "/login", login);
safeRoute("post", "/logout", logout);
safeRoute("post", "/emailAuthentication", verifyEmail);
safeRoute("get", "/profile", getUserProfile);

export default router;