import React, { useEffect, useState } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { TaskForm } from './TaskForm';
import { EventForm } from './EventForm';
import { ItemTypeSelector } from './ItemSelectorType';
import { useTasks } from './useTasks';
import { getDaysInMonth, addMonths, formatDate } from './useGoal';
import { useTodoStore } from '../../../store/todoStore';
import TaskView from './TaskView';
import TodoList from '../../../page/dashboard/todolist';

export const Calendar = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [selectedItemType, setSelectedItemType] = useState('task');
  const [editingTask, setEditingTask] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [todayTask, setTodayTask] = useState(null);
 const {
  dailyTasks,
  addDailyTask,
  getAllTodos,
  currentTodo, deleteDailyTask, updateDailyTask, deleteEvent
} = useTodoStore();
useEffect(() => {
  getAllTodos();
}, []);

  const days = getDaysInMonth(currentDate);
const handleViewTask = (task) => {
  setSelectedTask(task);
};
  const handlePreviousMonth = () => {
    setCurrentDate(prev => addMonths(prev, -1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };

  const handleDayClick = (date) => {
  setSelectedDate(formatDate(date));
  setEditingTask(null);
  setEditingEvent(null);

  if (selectedItemType === "task") {
    setIsTaskFormOpen(true);
  } else {
    setIsEventFormOpen(true);
  }
};

 const tasksForDate = (date) => {
  const formatted = typeof date === 'string' ? date : formatDate(date);
  return dailyTasks.filter(task => task.date === formatted && task.type === 'task');
};

const eventsForDate = (date) => {
  const formatted = typeof date === 'string' ? date : formatDate(date);
  return dailyTasks.filter(event => event.date === formatted && event.type === 'event');
};


  const handleEditEvent = (event) => {
    setSelectedDate(event.date);
    setEditingEvent(event);
    setEditingTask(null);
    setIsEventFormOpen(true);
  };

  const handleDeleteTask = async (task) => {
      
    await deleteDailyTask(currentTodo._id, task._id);
  };
 const handleEditTask = (task) => {
    setSelectedDate(task.date);
    setEditingTask(task);
    setEditingEvent(null);
    setIsTaskFormOpen(true);
  }
  const handleDeleteEvent = async (event) => {
    await deleteEvent(currentTodo._id, event._id);
  };

  const handleTaskFormClose = () => {
    setIsTaskFormOpen(false);
    setEditingTask(null);
  };

  const handleEventFormClose = () => {
    setIsEventFormOpen(false);
    setEditingEvent(null);
  };

 

  return (
    <div className="relative w-full md:w-5xl bg-gradient-to-br from-amber-50 to-orange-100 md:-ml-60">
     
      
      
      <div className="relative z-10 container mx-auto px-4 py-8">
       <CalendarHeader
        currentDate={currentDate}
        onPreviousMonth={() => setCurrentDate(addMonths(currentDate, -1))}
        onNextMonth={() => setCurrentDate(addMonths(currentDate, 1))}
      />
        
        {/* Item Type Selector */}
        <div className="max-w-md mx-auto mb-8">
          <ItemTypeSelector
            selectedType={selectedItemType}
            onTypeChange={setSelectedItemType}
          />
        </div>
        
        <CalendarGrid
           days={days}
        currentDate={currentDate}
        getTasksForDate={tasksForDate} 
        getEventsForDate={eventsForDate}
        onDayClick={handleDayClick}
          onDelete={handleDeleteTask}
          onEditTask={handleEditTask}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
          onViewTask={handleViewTask}
        />
        
        <TaskForm
          isOpen={isTaskFormOpen}

          onClose={handleTaskFormClose}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          selectedDate={selectedDate}
          editingTask={editingTask}
         
          selectedItemType={selectedItemType}
        />
        
        <EventForm
         isOpen={isEventFormOpen}
        onClose={handleEventFormClose}
        selectedDate={selectedDate}
        onEditEvent={handleEditEvent}
        onDeleteEvent={handleDeleteEvent}
        editingEvent={editingEvent}
        selectedItemType={selectedItemType}
        />
        {selectedTask && (
  <TaskView
  tasks={tasksForDate(selectedDate)}
  events ={eventsForDate(selectedDate)}
 />
 
)}
{todayTask &&(
  <TodoList
  todos = {tasksForDate(new Date())}

  />
)}

      </div>
    </div>
  );
};