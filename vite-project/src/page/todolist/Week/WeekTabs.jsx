import React from 'react';

// interface WeekTabProps {
//   weekNumber: number;
//   isActive: boolean;
//   onClick: (weekNumber: number) => void;
// }

export const WeekTab = ({ weekNumber, isActive, onClick }) => {
  return (
    <button
      onClick={() => onClick(weekNumber)}
      className={`
        px-4 py-2 rounded-lg font-medium transition-all duration-200
        ${isActive 
          ? 'bg-orange-600 text-white shadow-md' 
          : 'bg-yellow-100 text-orange-700 hover:bg-yellow-200 hover:shadow-sm'
        }
      `}
    >
      Week {weekNumber}
    </button>
  );
};