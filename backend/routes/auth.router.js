import express from 'express'
import {login,signup} from '../controllers/auth.controller.js'
import { logout } from '../controllers/auth.controller.js';
import { verifyEmail } from '../controllers/auth.controller.js';
import {getUserProfile} from '../controllers/auth.controller.js';

const router = express.Router();
router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.post("/emailAuthentication",verifyEmail);
router.get("/profile",getUserProfile)
export default router;