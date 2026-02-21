import React, { useEffect } from 'react';
import { CalendarDay } from './CalendarDay';

import { formatDate } from './useGoal';
import { useTodoStore } from '../../../store/todoStore';
// interface CalendarGridProps {
//   days: Date[];
//   currentDate: Date;
//   getTasksForDate: (date: string) => Task[];
//   getEventsForDate: (date: string) => Event[];
//   onDayClick: (date: Date) => void;
//   onEditTask: (task: Task) => void;
//   onDeleteTask: (taskId: string) => void;
//   onEditEvent: (event: Event) => void;
//   onDeleteEvent: (eventId: string) => void;
// }

export const CalendarGrid= ({
  days,
  currentDate,
  getTasksForDate,
  getEventsForDate,
  onDayClick,
  onEditTask, onViewTask,
  onDelete,
  onEditEvent, onViewEvent,
  onDeleteEvent,
}) => {
  const {dailyTasks, getAllTodos} = useTodoStore();
  useEffect(() => {
    getAllTodos();
  }, []);
  const today = new Date();
  const currentMonth = currentDate.getMonth();

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const tasksForDate = (date) => {
  const formatted = typeof date === 'string' ? date : formatDate(date);
  return dailyTasks.filter(task => task.date === formatted && task.type === 'task');
};

const eventsForDate = (date) => {
  const formatted = typeof date === 'string' ? date : formatDate(date);
  return dailyTasks.filter(event => event.date === formatted && event.type === 'event');
};

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
      {/* Day headers */}
      <div className="grid grid-cols-7 bg-amber-600">
        {dayNames.map((day) => (
          <div key={day} className="p-4 text-center">
            <span className="text-white font-semibold text-sm">{day}</span>
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const dateString = formatDate(day);
          const tasks = tasksForDate(dateString);
          const events = eventsForDate(dateString);
          const isCurrentMonth = day.getMonth() === currentMonth;
          const isToday = formatDate(day) === formatDate(today);

          return (
            <CalendarDay
            className="w-full border border-amber-200 p-2 cursor-pointer transition-all duration-200 hover:bg-amber-100 hover:shadow-md md:min-w-[500px]"
              key={index}
              date={day}
              isCurrentMonth={isCurrentMonth}
              isToday={isToday}
              tasks={tasks}
              events={events}
              onClick={() => onDayClick(day)}
              onEditTask={onEditTask}
              onViewTask={onViewTask}
              onDeleteTask={onDelete}
              onEditEvent={onEditEvent}
              onViewEvent={onViewEvent}
              onDeleteEvent={onDeleteEvent}
            />
          );
        })}
      </div>
    </div>
  );
};