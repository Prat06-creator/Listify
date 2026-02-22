import express from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js';
import { addMonthlyGoal,deleteMonthlyGoal,getToDoList,  updateMonthlyGoal, addWeeklyTask, updateWeeklyTask, deleteWeeklyTask, addDailyTask
, updateDailyTask, deleteDailyTask, addEvent, updateEvent,
deleteEvent
} from '../controllers/todo.controller.js';
const router = express.Router();
function safeRoute(method, path, ...handlers) {
  if (!path || typeof path !== "string") {
    console.error(`🚨 Invalid route detected: method=${method}, path=${path}`);
    return;
  }

  if (!router[method]) {
    console.error(`🚨 Invalid HTTP method: ${method}`);
    return;
  }

  console.log(`Registering route: ${method.toUpperCase()} ${path}`);

  router[method](path, ...handlers);
}
safeRoute("get","/todolist",authMiddleware, getToDoList) 
safeRoute("post","/todolist/:todoId/monthly",authMiddleware, addMonthlyGoal) //tested
safeRoute("put","/todolist/:todoId/monthly/:monthId",authMiddleware, updateMonthlyGoal)//tested
safeRoute("delete","/todolist/:todoId/monthly/:monthId",authMiddleware, deleteMonthlyGoal)//tested
safeRoute("post","/todolist/:todoId/weekly",authMiddleware, addWeeklyTask) //tested
safeRoute("put","/todolist/:todoId/weekly/:weekId",authMiddleware, updateWeeklyTask)//tested
safeRoute("delete","/todolist/:todoId/weekly/:weekId",authMiddleware, deleteWeeklyTask)//tested
safeRoute("post","/todolist/:todoId/daily",authMiddleware, addDailyTask)//tested
safeRoute("put","/todolist/:todoId/daily/:dayId",authMiddleware, updateDailyTask)//tested
safeRoute("delete","/todolist/:todoId/daily/:dayId",authMiddleware, deleteDailyTask)//tested
safeRoute("post","/todolist/:todoId/dailyevent",authMiddleware, addEvent)//tested
safeRoute("put","/todolist/:todoId/dailyevent/:dayId",authMiddleware, updateEvent)//tested
safeRoute("delete","/todolist/:todoId/dailyevent/:dayId",authMiddleware, deleteEvent)//tested
export default router;