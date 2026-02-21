import { useState, useCallback } from 'react';


export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);

  const addTask = useCallback((task) => {
    const newTask = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);
  }, []);

  const addEvent = useCallback((event) => {
    const newEvent= {
      ...event,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setEvents(prev => [...prev, newEvent]);
  }, []);

  const updateTask = useCallback((id, updatedTask) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    ));
  }, []);

  const updateEvent = useCallback((id, updatedEvent) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...updatedEvent } : event
    ));
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const deleteEvent = useCallback((id) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  }, []);

  const getTasksForDate = useCallback((date) => {
    return tasks.filter(task => task.date === date);
  }, [tasks]);

  const getEventsForDate = useCallback((date) => {
    return events.filter(event => event.date === date);
  }, [events]);

  return {
    tasks,
    events,
    addTask,
    addEvent,
    updateTask,
    updateEvent,
    deleteTask,
    deleteEvent,
    getTasksForDate,
    getEventsForDate,
  };
};