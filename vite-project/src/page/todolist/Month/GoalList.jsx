import React from 'react';

import { GoalItem } from './GoalItem';
import { Target } from 'lucide-react';
import { useTodoStore } from '../../../store/todoStore';
// interface GoalListProps {
//   goals: Goal[];
//   onUpdateGoal: (id: string, updates: Partial<Goal>) => void;
//   onDeleteGoal: (id: string) => void;
// }

export function GoalList({ goals, onUpdateGoal, onDeleteGoal, updatedGoal }) {
   const {currentTodo, monthlyTasks,getAllTodos, addMonthlyGoal, updateMonthlyGoal, deleteMonthlyGoal} = useTodoStore()
  if (goals.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-orange-100 rounded-full">
            <Target className="text-orange-500" size={32} />
          </div>
        </div>
        <div className="text-gray-600 text-lg mb-2 font-medium">No goals yet</div>
        <div className="text-gray-500 text-sm italic">Set your goals to stay focused and motivated!</div>
      </div>
    );
  }

  // Sort goals: incomplete first, then by priority (high > medium > low), then by creation date
  const sortedGoals = [...goals].sort((a, b) => {
    // Completed goals go to bottom
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Among incomplete goals, sort by priority
    if (!a.completed && !b.completed) {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
    }
    
    // Finally, sort by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
 
  return (
    <div className="space-y-4">
      {sortedGoals.map((goal) => (
        <GoalItem
          key={goal._id}
          goal={goal}
          onUpdateGoal={onUpdateGoal}
          onDeleteGoal={onDeleteGoal}
        />
      ))}
    </div>
  );
}