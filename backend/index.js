import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDb } from './db/connectDB.js';
import authRoutes from "./routes/auth.router.js";
import stickyRoutes from "./routes/sticky.router.js";
import todoRoutes from "./routes/todo.router.js";
import wishboardRoutes from "./routes/wishboard.router.js";
import brainDumpRoutes from "./routes/brainDump.js";
import budgetTrackerRoutes from "./routes/budgetTracker.router.js";
import aiRoutes from "./routes/ai.router.js";
dotenv.config();
const app=express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://listify-1-a3fy.onrender.com"
  ],
  credentials: true
}));
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit:"50mb",extended:true}));
app.use(cookieParser())
function mountRouter(path, router) {
  console.log(`Mounting router at path: ${path}`);
  app.use(path, router);
}
mountRouter("/api/auth", authRoutes);
mountRouter("/api/sticky", stickyRoutes);
mountRouter("/api/todo", todoRoutes);
mountRouter("/api/wishboard", wishboardRoutes);
mountRouter("/api/braindump", brainDumpRoutes);
mountRouter("/api/budgettracker",budgetTrackerRoutes)
mountRouter("/api/ai", aiRoutes);
app.get("/", (req, res) => {
  res.send("Listify Backend is Running 🚀");
});
app.use((req, res) => {
  res.status(404).send("404 page");
});
app.listen(PORT,()=>{
    connectDb();
    console.log(`Server is running ${PORT}`);
})
