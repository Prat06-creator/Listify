import React from 'react';
import { Calendar, CheckSquare } from 'lucide-react';

// interface ItemTypeSelectorProps {
//   selectedType: 'task' | 'event';
//   onTypeChange: (type: 'task' | 'event') => void;
// }

export const ItemTypeSelector = ({
  selectedType,
  onTypeChange,
}) => {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
      <button
        type="button"
        onClick={() => onTypeChange('task')}
        className={`
          flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all
          ${selectedType === 'task' 
            ? 'bg-amber-600 text-white shadow-sm' 
            : 'text-amber-700 hover:bg-amber-50'
          }
        `}
      >
        <CheckSquare size={16} />
        Task
      </button>
      <button
        type="button"
        onClick={() => onTypeChange('event')}
        className={`
          flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all
          ${selectedType === 'event' 
            ? 'bg-blue-600 text-white shadow-sm' 
            : 'text-blue-700 hover:bg-blue-50'
          }
        `}
      >
        <Calendar size={16} />
        Event
      </button>
    </div>
  );
};