import React, { useEffect } from 'react';
import { Edit2, Trash2, Clock, ExternalLink } from 'lucide-react';

import { useTodoStore } from '../../../store/todoStore';
// interface TaskItemProps {
//   task: Task;
//   onEdit: () => void;
//   onDelete: () => void;
// }

export const TaskItem = ({ task, onEdit, onDelete, onView }) => {
  const {getAllTodos, deleteDailyTasks, updateDailyTask} = useTodoStore();
   const priorityColors = {
    high: 'bg-red-100 border-red-300 text-red-800',
    medium: 'bg-amber-100 border-amber-300 text-amber-800',
    low: 'bg-green-100 border-green-300 text-green-800',
  };

  const priorityDots = {
    high: 'bg-red-400',
    medium: 'bg-amber-400',
    low: 'bg-green-400',
  };
useEffect(() => {
    getAllTodos();
  }, []);
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getTimeDisplay = () => {
    if (task.endTime) {
      return `${formatTime(task.startTime)} - ${formatTime(task.endTime)}`;
    }
    return formatTime(task.startTime);
  };
 
  return (
    <div className={`p-2 rounded-md border ${priorityColors[task.priority]} mb-1 group`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-1">
            <div className={`w-2 h-2 rounded-full ${priorityDots[task.priority]}`} />
            <h4 className="text-xs font-medium truncate">{task.title}</h4>
          </div>
          {task.description && (
            <p className="text-xs opacity-75 truncate mb-1">{task.description}</p>
          )}
          <div className="flex items-center text-xs opacity-75">
            <Clock size={10} className="mr-1" />
            {getTimeDisplay()}
          </div>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e)=>{e.stopPropagation(); onEdit();}}
            className="text-amber-600 hover:text-amber-800 p-1"
            title="Edit task"
          >
            <Edit2 size={10} />
          </button>
          <button
            onClick={(e)=>{e.stopPropagation(); onDelete();}}
            className="text-red-500 hover:text-red-700 p-1"
            title="Delete task"
          >
            <Trash2 size={10} />
          </button>
         
        </div>
         
      </div>
      <button className="text-amber-600 hover:text-amber-800 p-1" title="View"
       onClick={(e)=>{e.stopPropagation(); onView();}}
      >
            <ExternalLink size={10} />
          </button>
    </div>
  );
};