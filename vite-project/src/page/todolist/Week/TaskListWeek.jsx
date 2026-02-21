import React from 'react';
import { TaskItem } from './TaskItemWeek';


// interface TaskListProps {
//   tasks: Task[];
//   weekNumber: number;
//   onToggleComplete: (taskId: string) => void;
//   onEditTask: (taskId: string, newText: string, priority: TaskPriority) => void;
//   onDeleteTask: (taskId: string) => void;
// }

export const TaskList = ({ 
  tasks, 
  weekNumber, 

}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-orange-600 italic text-lg">
          No tasks for Week {weekNumber} yet. Add your first task!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
        
          
        />
      ))}
    </div>
  );
};