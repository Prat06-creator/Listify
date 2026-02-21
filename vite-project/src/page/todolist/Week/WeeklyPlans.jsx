import React, { useState , useEffect } from 'react';
import { WeekTab } from './WeekTabs';
import { TaskList } from './TaskListWeek';
import { AddTaskButton } from './AddTaskButton';
import { useTodoStore } from '../../../store/todoStore';

export const WeeklyPlans = () => {
   const {getAllTodos, addWeeklyTask,  weeklyTasks, currentTodo, setCurrentTodo} = useTodoStore()
  const [activeWeek, setActiveWeek] = useState();
  const [weekTasks, setWeekTasks] = useState({});
  const [totalWeeks, setTotalWeeks] = useState(4);

  useEffect(() => {
    getAllTodos()
  
   const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    setTotalWeeks(Math.ceil(totalDays / 7));
  }, [getAllTodos]);
  const currentTasks = weeklyTasks.filter(task => task.weekNumber === activeWeek);

  return (
    <div className=" bg-white rounded-lg shadow-lg p-4 border border-amber-200 h-fit max-w-2xl -mr-10">
      <div className="max-w-10xl ml-auto mr-auto p-2">
     <h2 className="text-2xl font-light text-amber-900 tracking-wide" style={{ fontFamily: 'serif' }}>
          Weekly Plans
        </h2>
        
        {/* Week Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[...Array(totalWeeks).keys()].map((weekNumber) => (
            <WeekTab
              key={weekNumber}
              weekNumber={  weekNumber + 1}
              isActive={activeWeek=== weekNumber+1}
              onClick={setActiveWeek}
            />
          ))}
        </div>

        {/* Add Task Button */}
        <div className="mb-6 ">
          <AddTaskButton
            weekNumber={activeWeek}
           
          />
        </div>

        {/* Task List */}
        <TaskList
          tasks={currentTasks}
          weekNumber={activeWeek}
          
        />
      </div>
    </div>
  );
};