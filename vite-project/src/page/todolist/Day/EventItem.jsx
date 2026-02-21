import React from 'react';
import { Edit2, Trash2, Clock, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import { useTodoStore } from '../../../store/todoStore';

// interface EventItemProps {
//   event: Event;
//   onEdit: () => void;
//   onDelete: () => void;
// }

export const EventItem= ({ event, onEdit, onDelete, onView }) => {
  const {getAllTodos} = useTodoStore();
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
    if (event.endTime) {
      return `${formatTime(event.startTime)} - ${formatTime(event.endTime)}`;
    }
    return formatTime(event.startTime);
  };

  return (
    <div className="p-2 rounded-md border bg-blue-100 border-blue-300 text-blue-800 mb-1 group">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-1">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <h4 className="text-xs font-medium truncate">{event.title}</h4>
          </div>
          {event.description && (
            <p className="text-xs opacity-75 truncate mb-1">{event.description}</p>
          )}
          <div className="flex items-center text-xs opacity-75">
            <Clock size={10} className="mr-1" />
            {getTimeDisplay()}
          </div>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e)=>{e.stopPropagation(); onEdit();}}
            className="text-blue-600 hover:text-blue-800 p-1"
            title="Edit event"
          >
            <Edit2 size={10} />
          </button>
          <button
            onClick={(e)=>{e.stopPropagation(); onDelete();}}
            className="text-red-500 hover:text-red-700 p-1"
            title="Delete event"
          >
            <Trash2 size={10} />
          </button>
        </div>
      </div>
      <button onClick={(e)=>{e.stopPropagation(); onView();}} className="text-amber-600 hover:text-amber-800 p-1" title="View">
                  <ExternalLink size={10} />
                </button>
    </div>
  );
};