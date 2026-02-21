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
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit:"50mb",extended:true}));
app.use(cookieParser())
app.use("/api/auth",authRoutes);
app.use ("/api/sticky",stickyRoutes)
app.use ("/api/todo",todoRoutes)
app.use("/api/wishboard",wishboardRoutes)
app.use("/api/braindump",brainDumpRoutes)
app.use("/api/budgettracker",budgetTrackerRoutes)
app.use("/api/ai", aiRoutes);
app.get("/", (req, res) => {
  res.send("Listify Backend is Running 🚀");
});
app.listen(PORT,()=>{
    connectDb();
    console.log(`Server is running ${PORT}`);
})
