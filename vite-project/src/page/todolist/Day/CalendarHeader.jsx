import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// interface CalendarHeaderProps {
//   currentDate: Date;
//   onPreviousMonth: () => void;
//   onNextMonth: () => void;
// }

export const CalendarHeader = ({
  currentDate,
  onPreviousMonth,
  onNextMonth,
}) => {
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long' });
  const year = currentDate.getFullYear();

  return (
    <div className="flex items-center justify-between mb-8">
      <button
        onClick={onPreviousMonth}
        className="p-3 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-700 transition-colors"
        aria-label="Previous month"
      >
        <ChevronLeft size={20} />
      </button>
      
      <div className="text-center">
        <h1 className="text-4xl font-bold text-amber-900 mb-1 font-serif">
          {monthName}
        </h1>
        <p className="text-xl text-amber-700 font-medium">{year}</p>
      </div>
      
      <button
        onClick={onNextMonth}
        className="p-3 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-700 transition-colors"
        aria-label="Next month"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};