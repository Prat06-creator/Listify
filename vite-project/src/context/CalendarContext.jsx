import React, { createContext, useContext, useState , useEffect} from 'react';

// export type Priority = 'high' | 'medium' | 'low';

// export interface Task {
//   id: string;
//   text: string;
//   priority: Priority;
//   completed: boolean;
//   date?: string;
//   week?: number;
// }

// export interface CalendarContextType {
//   currentDate: Date;
//   setCurrentDate: (date: Date) => void;
//   dailyTasks: Record<string, Task[]>;
//   addDailyTask: (date: string, task: Omit<Task, 'id'>) => void;
//   updateDailyTask: (date: string, taskId: string, updates: Partial<Task>) => void;
//   deleteDailyTask: (date: string, taskId: string) => void;
//   weeklyTasks: Task[];
//   addWeeklyTask: (task: Omit<Task, 'id'>) => void;
//   updateWeeklyTask: (taskId: string, updates: Partial<Task>) => void;
//   deleteWeeklyTask: (taskId: string) => void;
//   notes: string;
//   setNotes: (notes: string) => void;
//   monthlyGoals: Task[];
//   addMonthlyGoal: (goal: Omit<Task, 'id'>) => void;
//   updateMonthlyGoal: (goalId: string, updates: Partial<Task>) => void;
//   deleteMonthlyGoal: (goalId: string) => void;
// }

const CalendarContext = createContext(null);

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within CalendarProvider');
  }
  return context;
};

export const CalendarProvider= ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date()); // August 24, 2024
  const [dailyTasks, setDailyTasks] = useState({});
  const [weeklyTasks, setWeeklyTasks] = useState([]);
  const [notes, setNotes] = useState('');
  const [monthlyGoals, setMonthlyGoals] = useState([]);

    useEffect(() => {
    const getTimeUntilMidnight = () => {
      const now = new Date();
      const tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        0,
        0
      );
      return tomorrow - now;
    };

    // Set a timeout to trigger exactly at midnight
    const timeout = setTimeout(() => {
      setCurrentDate(new Date()); // Update to next day

      // After the first update, set an interval every 24 hours
      const interval = setInterval(() => {
        setCurrentDate(new Date());
      }, 24 * 60 * 60 * 1000);

      return () => clearInterval(interval);
    }, getTimeUntilMidnight());

    return () => clearTimeout(timeout);
  }, []);


  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const addDailyTask = (date, task) => {
    const newTask = { ...task, id: generateId() };
    setDailyTasks(prev => ({
      ...prev,
      [date]: [...(prev[date] || []), newTask]
    }));
  };

  const updateDailyTask = (date, taskId, updates) => {
    setDailyTasks(prev => ({
      ...prev,
      [date]: prev[date]?.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      ) || []
    }));
  };

  const deleteDailyTask = (date, taskId) => {
    setDailyTasks(prev => ({
      ...prev,
      [date]: prev[date]?.filter(task => task.id !== taskId) || []
    }));
  };

  const addWeeklyTask = (task) => {
    const newTask= { ...task, id: generateId() };
    setWeeklyTasks(prev => [...prev, newTask]);
  };

  const updateWeeklyTask = (taskId, updates) => {
    setWeeklyTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const deleteWeeklyTask = (taskId) => {
    setWeeklyTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const addMonthlyGoal = (goal) => {
    const newGoal = { ...goal, id: generateId() };
    setMonthlyGoals(prev => [...prev, newGoal]);
  };

  const updateMonthlyGoal = (goalId, updates) => {
    setMonthlyGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, ...updates } : goal
    ));
  };

  const deleteMonthlyGoal = (goalId) => {
    setMonthlyGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  const value = {
    currentDate,
    setCurrentDate,
    dailyTasks,
    addDailyTask,
    updateDailyTask,
    deleteDailyTask,
    weeklyTasks,
    addWeeklyTask,
    updateWeeklyTask,
    deleteWeeklyTask,
    notes,
    setNotes,
    monthlyGoals,
    addMonthlyGoal,
    updateMonthlyGoal,
    deleteMonthlyGoal,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};