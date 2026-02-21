import React from 'react';


export const getPriorityColors = (priority) => {
  switch (priority) {
    case 'high':
      return {
        bg: 'bg-red-100 border-red-200',
        text: 'text-red-800',
        hover: 'hover:bg-red-200',
        checkbox: 'text-red-600 focus:ring-red-500',
        badge: 'bg-red-500 text-white',
      };
    case 'medium':
      return {
        bg: 'bg-amber-100 border-amber-200',
        text: 'text-amber-800',
        hover: 'hover:bg-amber-200',
        checkbox: 'text-amber-600 focus:ring-amber-500',
        badge: 'bg-amber-500 text-white',
      };
    case 'low':
      return {
        bg: 'bg-green-100 border-green-200',
        text: 'text-green-800',
        hover: 'hover:bg-green-200',
        checkbox: 'text-green-600 focus:ring-green-500',
        badge: 'bg-green-500 text-white',
      };
    default:
      return {
        bg: 'bg-white border-gray-200',
        text: 'text-gray-800',
        hover: 'hover:bg-gray-50',
        checkbox: 'text-orange-600 focus:ring-orange-500',
        badge: 'bg-gray-500 text-white',
      };
  }
};

export const getPriorityLabel = (priority) => {
  switch (priority) {
    case 'high':
      return 'High';
    case 'medium':
      return 'Medium';
    case 'low':
      return 'Low';
    default:
      return 'Medium';
  }
};


export const PrioritySelector = ({ 
  priority, 
  onChange, 
  size = 'normal' 
}) => {
  const priorities = ['high', 'medium', 'low'];

  return (
    <select
      value={priority}
      onChange={(e) => onChange(e.target.value)}
      className={`
        border rounded focus:outline-none focus:ring-2 focus:ring-orange-500
        ${size === 'small' ? 'px-2 py-1 text-sm' : 'px-3 py-2'}
        ${getPriorityColors(priority).bg} ${getPriorityColors(priority).text}
      `}
    >
      {priorities.map((p) => {
        const colors = getPriorityColors(p);
        return (
          <option 
            key={p} 
            value={p} 
            className={`${colors.bg} ${colors.text}`}
          >
            {getPriorityLabel(p)}
          </option>
        );
      })}
    </select>
  );
};

// interface PrioritySelectorProps {
//   priority: TaskPriority;
//   onChange: (priority: TaskPriority) => void;
//   size?: 'small' | 'normal';
// }

// export const PrioritySelector = ({ 
//   priority, 
//   onChange, 
//   size = 'normal' 
// }) => {
//   const priorities = ['high', 'medium', 'low'];
  
//   return (
//     <select
//       value={priority}
//       onChange={(e) => onChange(e.target.value)}
//       className={`
//         border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500
//         ${size === 'small' ? 'px-2 py-1 text-sm' : 'px-3 py-2'}
//       `}
//     >
//       {priorities.map((p) => (
//         < option key={p} value={p}>
//           {getPriorityLabel(p)}
//         </option>
//       ))}
//     </select>
//   );
// };