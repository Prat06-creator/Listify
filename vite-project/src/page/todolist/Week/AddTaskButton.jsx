import React, { useEffect, useState } from 'react';
import { Plus, Check, X } from 'lucide-react';
import { useTodoStore } from "../../../store/todoStore";
import { PrioritySelector } from './PrioritySelector';


// interface AddTaskButtonProps {
//   weekNumber: number;
//   onAddTask: (text: string, priority: TaskPriority) => void;
// }

export const AddTaskButton = ({ weekNumber }) => {
  const {getAllTodos, addWeeklyTask,  weeklyTasks, currentTodo, setCurrentTodo} = useTodoStore()
  const [isAdding, setIsAdding] = useState(false);
  const [taskText, setTaskText] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium');

  useEffect(() => {
    getAllTodos()
  }, [])

  const handleSubmit = () => {
    if (taskText.trim()) {
      addWeeklyTask(currentTodo._id, {text: taskText.trim(), priority: taskPriority, weekNumber, month: new Date().getMonth(), year: new Date().getFullYear()}  )
      setTaskText('');
      setTaskPriority('medium');
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setTaskText('');
    setTaskPriority('medium');
    setIsAdding(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isAdding) {
    return (
      <div className="flex items-center gap-2 p-4 bg-yellow-50 rounded-lg border-2 border-dashed border-yellow-300 flex-wrap">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter your task..."
          className="flex-1 min-w-0 px-3 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          autoFocus
        />
        <PrioritySelector
          priority={taskPriority}
          onChange={setTaskPriority}
        />
        <button
          onClick={handleSubmit}
          className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          title="Add task"
        >
          <Check size={18} />
        </button>
        <button
          onClick={handleCancel}
          className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          title="Cancel"
        >
          <X size={18} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsAdding(true)}
      className="w-full p-4 bg-yellow-50 text-orange-700 rounded-lg border-2 border-dashed border-yellow-300 hover:bg-yellow-100 hover:border-yellow-400 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
    >
      <Plus size={20} />
      Add Task to Week {weekNumber}
    </button>
  );
};