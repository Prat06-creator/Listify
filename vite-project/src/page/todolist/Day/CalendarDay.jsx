import React from 'react';
import { useEffect, useState } from 'react';
import { useTodoStore } from '../../../store/todoStore';
import { TaskItem } from './TaskItem';
import { EventItem } from './EventItem';
import TaskView from './TaskView';
// interface CalendarDayProps {
//   date: Date;
//   isCurrentMonth: boolean;
//   isToday: boolean;
//   tasks: Task[];
//   events: Event[];
//   onClick: () => void;
//   onEditTask: (task: Task) => void;
//   onDeleteTask: (taskId: string) => void;
//   onEditEvent: (event: Event) => void;
//   onDeleteEvent: (eventId: string) => void;
// }

export const CalendarDay = ({
  date,
  isCurrentMonth,
  isToday,
  tasks,
  events,
  onClick,
  onEditTask,
  onDeleteTask, onViewTask,
  onEditEvent, onViewEvent,
  onDeleteEvent,
}) => {
  const {getAllTodos} = useTodoStore();

  useEffect(() => {
      getAllTodos();
    }, []);
  const dayNumber = date.getDate();
  const totalItems = tasks.length + events.length;
  const maxDisplayItems = 3;

  return (
    <div
      className={`
        min-h-32 border border-amber-200 p-2 cursor-pointer transition-all duration-200
        ${isCurrentMonth ? 'bg-white' : 'bg-amber-50'}
        ${isToday ? 'ring-2 ring-amber-400 bg-amber-50' : ''}
        hover:bg-amber-100 hover:shadow-md
      `}
      onClick={onClick}
    >
      <div className={`
        text-sm font-medium mb-2
        ${isCurrentMonth ? 'text-amber-900' : 'text-amber-500'}
        ${isToday ? 'text-amber-700 font-bold' : ''}
      `}>
        {dayNumber}
      </div>
      
      <div className="space-y-1 max-h-20 overflow-y-auto">
        {/* Display events first */}
        {events.slice(0, Math.min(maxDisplayItems, events.length)).map((event) => (
          <EventItem
            key={event._id}
            event={event}
            onEdit={() => onEditEvent(event)}
            onDelete={() => onDeleteEvent(event)}
            onView={() => onViewEvent(event)}
          />
        ))}
        
        {/* Display tasks after events */}
       
        {tasks.slice(0, Math.max(0, maxDisplayItems //events.length
        ))
         .map((task) => (
          <TaskItem
            key={task._id}
            task={task}
          onEdit={() => onEditTask(task)}  
    onDelete={() => onDeleteTask(task)}
    onView={() => onViewTask(task)}
           
          />
        ))}
       {totalItems > maxDisplayItems && (
          <div className="text-xs text-amber-600 font-medium">
            +{totalItems - maxDisplayItems} more
          </div>
        )}
</div>
    </div>
  );
};