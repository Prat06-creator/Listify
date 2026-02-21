import express from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js';
import { addMonthlyGoal,deleteMonthlyGoal,getToDoList,  updateMonthlyGoal, addWeeklyTask, updateWeeklyTask, deleteWeeklyTask, addDailyTask
, updateDailyTask, deleteDailyTask, addEvent, updateEvent,
deleteEvent
} from '../controllers/todo.controller.js';
const router = express.Router();
router.get("/todolist",authMiddleware, getToDoList) 
router.post("/todolist/:todoId/monthly",authMiddleware, addMonthlyGoal) //tested
router.put ("/todolist/:todoId/monthly/:monthId",authMiddleware, updateMonthlyGoal)//tested
router.delete("/todolist/:todoId/monthly/:monthId",authMiddleware, deleteMonthlyGoal)//tested
router.post("/todolist/:todoId/weekly",authMiddleware, addWeeklyTask) //tested
router.put ("/todolist/:todoId/weekly/:weekId",authMiddleware, updateWeeklyTask)//tested
router.delete("/todolist/:todoId/weekly/:weekId",authMiddleware, deleteWeeklyTask)//tested
router.post("/todolist/:todoId/daily",authMiddleware, addDailyTask)//tested
router.put ("/todolist/:todoId/daily/:dayId",authMiddleware, updateDailyTask)//tested
router.delete("/todolist/:todoId/daily/:dayId",authMiddleware, deleteDailyTask)//tested
router.post("/todolist/:todoId/dailyevent",authMiddleware, addEvent)//tested
router.put ("/todolist/:todoId/dailyevent/:dayId",authMiddleware, updateEvent)//tested
router.delete("/todolist/:todoId/dailyevent/:dayId",authMiddleware, deleteEvent)//tested
export default router;