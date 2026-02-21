import React, { useEffect, useState } from 'react';
import { Plus, Target } from 'lucide-react';

import { useTodoStore } from '../../../store/todoStore';
// interface GoalInputProps {
//   onAddGoal: (text: string, priority: Priority) => void;
//   isVisible: boolean;
//   onCancel: () => void;
// }

export function GoalInput({ onAddGoal, isVisible, onCancel }) {
const {currentTodo,getAllTodos, addMonthlyGoal, updateMonthlyGoal, deleteMonthlyGoal} = useTodoStore()
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    getAllTodos();
  }, []);

  const handleSubmit = (e) => {
  e.preventDefault();
  if (text.trim()) {
    const goalData = { 
      text: text.trim(), 
      priority, 
      month: new Date().getMonth(), 
      year: new Date().getFullYear() 
    };
    onAddGoal(goalData);

    setText('');
    setPriority('medium');
    onCancel();
  }
};
  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-4 mb-6 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-2">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="px-3 py-1.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all duration-200 bg-white text-gray-700 font-medium text-sm"
            >
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200 font-medium text-sm"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={!text.trim()} 
              className="px-4 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm"
            >
              Add Goal
            </button>
          </div>
        </div>
        
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your goal..."
          className="w-full px-3 py-2 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 resize-none h-16 text-sm"
          autoFocus
        />
      </form>
    </div>
  );
}