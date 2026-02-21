import React, { useState, useEffect } from 'react';
import { X, Clock, AlertCircle, FileText } from 'lucide-react';
import { useTodoStore } from '../../../store/todoStore';

// interface TaskFormProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (task: Omit<Task, 'id' | 'createdAt'>) => void;
//   selectedDate: string;
//   editingTask?: Task | null;
//   onUpdate?: (id: string, task: Partial<Task>) => void;
// }

export const TaskForm = ({
  isOpen,
  onClose,
  selectedDate,
  editingTask,
  onUpdate, selectedItemType
}) => {
  const {currentTodo, dailyTasks, addDailyTask, getAllTodos, updateDailyTask} = useTodoStore()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    getAllTodos();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !startTime.trim()) return;
    const normalizedDate = new Date(selectedDate);
  if (isNaN(normalizedDate)) {
    console.error("Invalid selectedDate:", selectedDate);
    return;
  }

  const dateKey = normalizedDate.toISOString().split("T")[0];
    const taskData = {
      title: title.trim(),
      description: description.trim(),
      priority,
      startTime: startTime.trim(),
      endTime: endTime.trim() || undefined,
      date: dateKey,
      month : new Date(selectedDate).getMonth(),
      year : new Date(selectedDate).getFullYear(),
      type: 'task'
    };

    if (editingTask && onUpdate) {
      await updateDailyTask(currentTodo._id, editingTask._id, taskData);
    } else {
      await addDailyTask(currentTodo._id,taskData);
    }
    onClose();
  };

  if (!isOpen) return null;

  const priorityColors = {
    high: 'border-red-500 bg-red-50',
    medium: 'border-amber-500 bg-amber-50',
    low: 'border-green-500 bg-green-50',
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-amber-100">
          <h3 className="text-xl font-semibold text-amber-900">
            {editingTask ? 'Edit Task' : 'Create New Task'}
          </h3>
          <button
            onClick={onClose}
            className="text-amber-600 hover:text-amber-800 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                <FileText size={16} className="inline mr-1" />
                Task Name *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Enter task name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                placeholder="Optional description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                <AlertCircle size={16} className="inline mr-1" />
                Priority
              </label>
              <div className="space-y-2">
                {(['high', 'medium', 'low'] ).map((p) => (
                  <label key={p} className="flex items-center">
                    <input
                      type="radio"
                      name="priority"
                      value={p}
                      checked={priority === p}
                      onChange={(e) => setPriority(e.target.value)}
                      className="mr-2"
                    />
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border-2 ${priorityColors[p]}`}>
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  <Clock size={16} className="inline mr-1" />
                  Start Time *
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  <Clock size={16} className="inline mr-1" />
                  End Time
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-amber-700 bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors"
            >
              {editingTask ? 'Update' : 'Save'} Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};