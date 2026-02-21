import React, { useState } from 'react';
import { Edit2, Trash2, Check, X } from 'lucide-react';
import { useTodoStore } from '../../../store/todoStore';
import { useEffect } from 'react';


// interface GoalItemProps {
//   goal: Goal;
//   onUpdateGoal: (id: string, updates: Partial<Goal>) => void;
//   onDeleteGoal: (id: string) => void;
// }

export function GoalItem({ goal, onUpdateGoal, onDeleteGoal }) {
  const {currentTodo, monthlyTasks,getAllTodos, addMonthlyGoal, updateMonthlyGoal, deleteMonthlyGoal} = useTodoStore()
  const [isEditing, setIsEditing] = useState(false);
  const [editPriority, setEditPriority] = useState(goal.priority);
  const [editText, setEditText] = useState(goal.text);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    useEffect(() => {
    getAllTodos();
  }, []);

  const priorityStyles = {
    high: {
      border: 'border-red-300',
      bg: 'bg-red-50',
      accent: 'bg-red-500',
      text: 'text-red-800',
      label: 'bg-red-100 text-red-800',
      hover: 'hover:bg-red-100'
    },
    medium: {
      border: 'border-orange-300',
      bg: 'bg-orange-50',
      accent: 'bg-orange-500',
      text: 'text-orange-800',
      label: 'bg-orange-100 text-orange-800',
      hover: 'hover:bg-orange-100'
    },
    low: {
      border: 'border-green-300',
      bg: 'bg-green-50',
      accent: 'bg-green-500',
      text: 'text-green-800',
      label: 'bg-green-100 text-green-800',
      hover: 'hover:bg-green-100'
    },
  };

  const style = priorityStyles[editPriority || goal.priority] 



 const handleSaveEdit = async (e) => {
    e.preventDefault();
  if (editText.trim()) {
    const updatedGoal = {
     
      text: editText.trim(),
      priority: editPriority, completed: goal.completed
    };
    await updateMonthlyGoal(currentTodo._id, goal._id, updatedGoal);
    setEditPriority(updatedGoal.priority);
    setEditText(updatedGoal.text);
    setIsEditing(false);

    }
  }


  const handleCancelEdit = (e) => {
     e.preventDefault();
    setEditText(goal.text);
   
    setIsEditing(false);
  };

  const handleToggleComplete = async  (e) => {
     e.preventDefault();
     await updateMonthlyGoal(currentTodo._id, goal._id, { completed: !goal.completed });
    
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    await deleteMonthlyGoal(currentTodo._id, goal._id);
  };

  return (
    <div className={`border-2 ${style.border} ${style.bg} rounded-xl p-4 transition-all duration-300 hover:shadow-lg group ${style.hover}`}>
      {/* Priority indicator and actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${style.accent}`}></div>
        </div>
        
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {!isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200"
                title="Edit goal"
              >
                <Edit2 size={14} />
              </button>
              
              <button
                onClick={handleDeleteClick}
                className={'p-1.5 rounded-lg transition-all duration-200 text-red-600 bg-red-100' }
                
              >
                <Trash2 size={14} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Goal content */}
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggleComplete}
          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 mt-0.5 ${
            goal.completed
              ? `${style.accent} border-transparent`
              : `border-gray-300 hover:border-gray-400`
          }`}
        >
          {goal.completed && <Check size={14} className="text-white m-auto" />}
        </button>

        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.ctrlKey) handleSaveEdit();
                  if (e.key === 'Escape') handleCancelEdit();
                }}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none resize-none text-sm"
                rows={3}
                autoFocus
              />
              {/* Priority edit */}
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium">Priority:</label>
      <select
        value={editPriority}
        onChange={(e) => setEditPriority(e.target.value)}
        className="px-2 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent"
      >
        <option value="high">High 🔴</option>
        <option value="medium">Medium 🟠</option>
        <option value="low">Low 🟢</option>
      </select>
    </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveEdit}
                  className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center gap-1.5 font-medium text-sm"
                >
                  <Check size={14} />
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 flex items-center gap-1.5 font-medium text-sm"
                >
                  <X size={14} />
                  Cancel
                </button>
                <span className="text-xs text-gray-500 ml-1">Ctrl+Enter to save</span>
              </div>
            </div>
          ) : (
            <div
              onClick={() => setIsEditing(true)}
              className={`cursor-pointer transition-all duration-200 ${
                goal.completed ? 'line-through opacity-60' : 'hover:opacity-80'
              }`}
            >
              <p className={`text-sm font-medium leading-relaxed ${style.text}`}>
                {goal.text}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Creation timestamp */}
      <div className="mt-3 text-xs text-gray-500 flex items-center gap-1.5">
  <div className={`w-1.5 h-1.5 rounded-full ${style.accent} opacity-60`}></div>
  {goal.createdAt ? (
    <>
      Created {new Date(goal.createdAt).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}
    </>
  ) : (
    <span>Created just now</span>
  )}
</div>

    </div>
  );
}