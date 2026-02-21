import mongoose from "mongoose";
import {ToDoList} from "../models/todo.model.js";
import { User } from "../models/User.model.js";
export const getToDoList = async (req,res)=>{
    try{
        const userId = req.user._id;
        let todo = await ToDoList.findOne({userId:req.user._id});
        if (!todo){
            todo = new ToDoList({
                userId, event:[] , task:[],
                days: [],
                weeks: [],
                months: []
            })
            await todo.save();
        }
        console.log('Fetched ToDoList:', todo);
        res.status(200).json(todo);
    }catch(error){
        console.error('Error fetching ToDoList:', error);
        res.status(500).json({error: error.message});
    }
};
export const updateDailyTask = async (req, res) => {
    try {
        const { todoId, dayId } = req.params;
        const { text, priority, description, endTime, startTime, month , year } = req.body;
        const todo = await ToDoList.findOne({ _id: todoId, userId: req.user._id });
        if (!todo) return res.status(404).json({ error: "ToDo item not found" });
        const dayGoal = todo.days.id(dayId);
        if (!dayGoal) return res.status(404).json({ error: "Daily task not found" });
        dayGoal.text = text ?? dayGoal.text;
        dayGoal.priority = priority ?? dayGoal.priority;
        dayGoal.description = description ?? dayGoal.description;
        dayGoal.endTime = endTime ?? dayGoal.endTime;
        dayGoal.startTime = startTime ?? dayGoal.startTime;
        dayGoal.month = month ?? dayGoal.month;
        dayGoal.year = year ?? dayGoal.year;
        await todo.save();
        res.status(200).json(dayGoal);
    } catch (error) {
        console.error('Error updating daily task:', error);
        res.status(500).json({ error: error.message });
    }
};
export const addMonthlyGoal = async(req,res)=>{
    try {
        const {todoId} = req.params;
        const user = req.user;
        if (!user) return res.status(404).json({ error: 'User not found' });
         const {text,priority,month,year}= req.body;
          if (month <0 || month >11)  {
            return res.status(400).json({error: "Month must be between 0 and 11"});
        }
        let todo = await ToDoList.findOne({userId: user._id });
        if (!todo) {
            todo = new ToDoList({ userId: user._id, months: [], days: [], weeks: [] });
        }
       
        const newGoal = {
            userId: user._id,
            text, priority,month,year
        };
       
        todo.months.push(newGoal);
        console.log('New Monthly Goal Added:', newGoal); //
        res.status(201).json(newGoal);
        await todo.save()
    } catch (error) {
        console.error('Error adding monthly goal:', error);
        res.status(500).json({error: error.message});
    }
};
export const updateMonthlyGoal = async (req,res)=>{
    try {
       const {todoId,monthId} = req.params;
       const {text,priority,completed} = req.body;
       const todo = await ToDoList.findOne({_id:todoId, userId: req.user._id});
       if (!todo) return res.status(404).json({error: "ToDo item not found"});
       const monthlyGoal = todo.months.id(monthId);
       if (!monthlyGoal) return res.status(404).json({error: "Monthly goal not found"});
       monthlyGoal.text=text??monthlyGoal.text;
       monthlyGoal.priority=priority??monthlyGoal.priority;
       monthlyGoal.completed=completed??monthlyGoal.completed;
       await todo.save();
       res.status(200).json(monthlyGoal);
    } catch (error) {
        console.error('Error updating monthly goal:', error);
        res.status(500).json({error: error.message});
    }
};
export const deleteMonthlyGoal = async (req,res)=>{
    try {
       const {todoId,monthId} = req.params;
       const todo = await ToDoList.findOne({_id:todoId, userId: req.user._id});
       if (!todo) return res.status(404).json({error: "ToDo item not found"});
       const monthlyGoal= todo.months.id(monthId);
       if (!monthlyGoal) return res.status(404).json({error: "Monthly goal not found"});
       todo.months.pull({ _id: monthId });
       await todo.save();
       res.status(200).json({ message: 'Monthly goal deleted successfully' });
    } catch (error) {
         console.error('Error deleting monthly goal:', error);
         res.status(500).json({error: error.message});
    }
}

export const addWeeklyTask = async (req, res) => {
    try {
        const { todoId } = req.params;
        const user = req.user;
        if (!user) return res.status(404).json({ error: 'User not found' });
        const { text, priority ,month,weekNumber, year } = req.body;
        let todo = await ToDoList.findOne({ userId: user._id });
        if (!todo) {
            todo = new ToDoList({ userId: user._id, weeks: [], days: [], months: [] });
        }
        const newWeekTask = {
            userId: user._id,
            text,
            priority,
            weekNumber,month,year
        }
        todo.weeks.push(newWeekTask);
        await todo.save();
        console.log('New Weekly Task Added:', newWeekTask); //
        res.status(201).json(newWeekTask);
       
    } catch (error) {
        console.error('Error adding weekly task:', error);
        res.status(500).json({ error: error.message });
    }
}

export const updateWeeklyTask = async (req, res) => {
    try {
        const { todoId, weekId } = req.params;
        const { text, priority, completed } = req.body;
        const todo = await ToDoList.findOne({ _id: todoId, userId: req.user._id });
        if (!todo) return res.status(404).json({ error: "ToDo item not found" });
        const weeklyGoal = todo.weeks.id(weekId);
        if (!weeklyGoal) return res.status(404).json({ error: "Weekly task not found" });
        weeklyGoal.text = text ?? weeklyGoal.text;
        weeklyGoal.priority = priority ?? weeklyGoal.priority;
        weeklyGoal.completed = completed ?? weeklyGoal.completed;
        await todo.save();
        res.status(200).json(weeklyGoal);
    } catch (error) {
        console.error('Error updating weekly task:', error);
        res.status(500).json({ error: error.message });
    }
};
export const deleteWeeklyTask = async (req, res) => {
    try {
        const { todoId, weekId } = req.params;
        const todo = await ToDoList.findOne({ _id: todoId, userId: req.user._id });
        if (!todo) return res.status(404).json({ error: "ToDo item not found" });
        const weeks = todo.weeks.id(weekId);
        if (!weeks) return res.status(404).json({ error: "Weekly task not found" });
        todo.weeks.pull({ _id: weekId });
        await todo.save();
        res.status(200).json({ message: 'Weekly task deleted successfully' });
    } catch (error) {
        console.error('Error deleting weekly task:', error);
        res.status(500).json({ error: error.message });
    }
};



export const addDailyTask = async (req, res) => {
    try {
        const {todoId} = req.params;
        const user = req.user;
        if (!user) return res.status(404).json({ error: 'User not found' });
        const { type,title, priority, date, description, month, year, endTime, startTime } = req.body;
        let todo = await ToDoList.findOne({_id:todoId,  userId: user._id });
        if (!todo) {
            todo = new ToDoList({ userId: user._id, days: [] });
        }
        const newDayTask = {
            userId: user._id,
            title: title,
            priority: priority,
            description: description,
            type: type,
            startTime: startTime,
            endTime: endTime,
            month: month,
            year: year,
            date: date
        }
        todo.days.push(newDayTask);
         await todo.save();
        console.log('New Daily Task Added:', newDayTask); //
        res.status(201).json(newDayTask);
      
    } catch (error) {
        console.error('Error adding daily task:', error);
        res.status(500).json({ error: error.message });
    }
}

export const deleteDailyTask = async (req, res) => {
    try {
        const { todoId, dayId } = req.params;
        const todo = await ToDoList.findOne({ _id: todoId, userId: req.user._id });
        if (!todo) return res.status(404).json({ error: "ToDo item not found" });
        const dayGoal = todo.days.id(dayId);
        if (!dayGoal) return res.status(404).json({ error: "Daily task not found" });
        todo.days.pull({ _id: dayId });
        await todo.save();
        res.status(200).json({ message: 'Daily task deleted successfully' });
    } catch (error) {
        console.error('Error deleting daily task:', error);
        res.status(500).json({ error: error.message });
    }
};

export const addEvent = async (req, res) => {
    try {
        const {todoId} = req.params;
        const user = req.user;
        if (!user) return res.status(404).json({ error: 'User not found' });
        const { type, title, date, description, month, year, endTime, startTime } = req.body;
        let todo = await ToDoList.findOne({_id:todoId,  userId: user._id });
        if (!todo) {
            todo = new ToDoList({ userId: user._id, days: [] });
        }
        const newDayEvent = {
            userId: user._id,
            title: title,
            type: type,
            description: description,
            startTime: startTime,
            endTime: endTime,
            month: month,
            year: year,
            date: date
        }
        todo.days.push(newDayEvent);
         await todo.save();
        console.log('New Daily Task Added:', newDayEvent); //
        res.status(201).json(newDayEvent);
      
    } catch (error) {
        console.error('Error adding daily task:', error);
        res.status(500).json({ error: error.message });
    }
}
export const updateEvent = async (req, res) => {
    try {
        const { todoId, dayId } = req.params;
        const { text,description, endTime, startTime, month , year } = req.body;
        const todo = await ToDoList.findOne({ _id: todoId, userId: req.user._id });
        if (!todo) return res.status(404).json({ error: "ToDo item not found" });
        const dayGoal = todo.days.id(dayId);
        if (!dayGoal) return res.status(404).json({ error: "Daily task not found" });
        dayGoal.text = text ?? dayGoal.text;
        dayGoal.description = description ?? dayGoal.description;
        dayGoal.endTime = endTime ?? dayGoal.endTime;
        dayGoal.startTime = startTime ?? dayGoal.startTime;
        dayGoal.month = month ?? dayGoal.month;
        dayGoal.year = year ?? dayGoal.year;
        await todo.save();
        res.status(200).json(dayGoal);
    } catch (error) {
        console.error('Error updating daily task:', error);
        res.status(500).json({ error: error.message });
    }
};
export const deleteEvent = async (req, res) => {
    try {
        const { todoId, dayId } = req.params;
        const todo = await ToDoList.findOne({ _id: todoId, userId: req.user._id });
        if (!todo) return res.status(404).json({ error: "ToDo item not found" });
        const dayGoal = todo.days.id(dayId);
        if (!dayGoal) return res.status(404).json({ error: "Daily task not found" });
        todo.days.pull({ _id: dayId });
        await todo.save();
        res.status(200).json({ message: 'Daily task deleted successfully' });
    } catch (error) {
        console.error('Error deleting daily task:', error);
        res.status(500).json({ error: error.message });
    }
};