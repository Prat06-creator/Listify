import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Check, X } from 'lucide-react';
import { getPriorityLabel, getPriorityColors } from './PrioritySelector';
import { PrioritySelector } from './PrioritySelector';
import { useTodoStore } from '../../../store/todoStore';


// interface TaskItemProps {
//   task: Task;
//   onToggleComplete: (taskId: string) => void;
//   onEdit: (taskId: string, newText: string, priority: TaskPriority) => void;
//   onDelete: (taskId: string) => void;
// }

export const TaskItem = ({ 
  task, 
}) => {
  const {getAllTodos,currentTodo, setCurrentTodo, updateWeeklyTask, deleteWeeklyTask, weeklyTasks} = useTodoStore()
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editPriority, setEditPriority] = useState(task.priority);
  const colors = getPriorityColors(task.priority);

  useEffect(() => {
    getAllTodos()
  },[])
  const handleSave = async () => {
    if (editText.trim()) {
      await updateWeeklyTask(currentTodo._id, task._id, { text: editText, priority: editPriority, completed: task.completed });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(task.text);
    setEditPriority(task.priority);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleToggleComplete = async  (e) => {
     e.preventDefault();
     await updateWeeklyTask(currentTodo._id, task._id, { completed: !task.completed });
    
  };
  const priorityColors = getPriorityColors(task.priority);
 const handleDelete = async (e) => {
    e.preventDefault();
    await deleteWeeklyTask(currentTodo._id, task._id);
    await getAllTodos();
 };
  return (
    <div className={` p-1 rounded-lg shadow-sm border transition-all duration-200 ${colors.bg} ${colors.hover} hover:shadow-md`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggleComplete}
        className={`w-2 h-5 rounded focus:ring-2 ${colors.checkbox}  w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400`}
        
            autoFocus
      />
      
      {isEditing ? (
        <div className="flex-1 flex items-center gap-2 flex-wrap">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 min-w-0 px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            autoFocus
          />
          <PrioritySelector
            priority={editPriority}
            onChange={setEditPriority}
            size="small"
          />
          <button
            onClick={handleSave}
            className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
            title="Save"
          >
            <Check size={16} />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Cancel"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 flex items-center gap-2">
            <span 
              className={`flex-1 ${
                task.completed 
                  ? 'line-through text-gray-500' 
                  : priorityColors.text
              } transition-all duration-200`}
            >
              {task.text}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors.badge}`}>
              {getPriorityLabel(task.priority)}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-orange-600 hover:bg-orange-50 rounded transition-colors"
              title="Edit task"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};