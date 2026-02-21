import React, { useState, useEffect } from 'react';
import { X, Clock, Calendar, FileText } from 'lucide-react';
import { useTodoStore } from '../../../store/todoStore';

// interface EventFormProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (event: Omit<Event, 'id' | 'createdAt'>) => void;
//   selectedDate: string;
//   editingEvent?: Event | null;
//   onUpdate?: (id: string, event: Partial<Event>) => void;
// }

export const EventForm = ({
  isOpen,
  onClose,
  selectedItemType,
  selectedDate,
  editingEvent,
  onUpdate,
}) => {
  const { currentTodo, addEvent, getAllTodos, dailyTasks, updateEvent } = useTodoStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    getAllTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !startTime.trim()) return;
    const normalizedDate = new Date(selectedDate);
if (isNaN(normalizedDate)) return;

const dateKey = normalizedDate.toISOString().split("T")[0];

    const eventData = {
      title: title.trim(),
      description: description.trim(),
      startTime: startTime.trim(),
      endTime: endTime.trim() ,
      date: dateKey,
       month : new Date(selectedDate).getMonth(),
      year : new Date(selectedDate).getFullYear(),
      type: 'event'
    };

    if (editingEvent && onUpdate) {
      await updateEvent(currentTodo._id, editingEvent._id, eventData);
    } else {
      await addEvent(currentTodo._id, eventData);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-blue-100">
          <h3 className="text-xl font-semibold text-blue-900">
            {editingEvent ? 'Edit Event' : 'Create New Event'}
          </h3>
          <button
            onClick={onClose}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">
                <FileText size={16} className="inline mr-1" />
                Event Name *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter event name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Optional description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  <Clock size={16} className="inline mr-1" />
                  Start Time *
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  <Clock size={16} className="inline mr-1" />
                  End Time
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingEvent ? 'Update' : 'Save'} Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};