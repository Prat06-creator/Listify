import React, { useState, useEffect } from 'react';
import { Plus, X, Heart, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTodoStore } from '../../store/todoStore';
const TodoList = ({title = "To Do List",className = ""}) => {
  const navigate = useNavigate();
 const {dailyTasks, getAllTodos } = useTodoStore();
 useEffect(() => {
    getAllTodos(); 
  }, []);
const todayKey = new Date().toISOString().split("T")[0];

const todaysItems = dailyTasks.filter(
  item => item.date === todayKey
);

 return (
    <div className={`h-132 w-90 ml-1 mt-1 relative max-w-md mx-auto bg-gradient-to-br from-pink-50 via-pink-100 to-purple-100 rounded-3xl shadow-2xl p-8 ${className}`}>
      
     
      <div className="absolute top-4 right-4 text-pink-200 opacity-30">
        <Sparkles size={20} />
      </div>
      <div className="absolute bottom-4 left-4 text-purple-200 opacity-20">
        <Sparkles size={16} />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-gray-800 tracking-wide" style={{ fontFamily: 'Brush Script MT, cursive' }}>
            {title}
          </h1>
          <Heart size={28} className="text-pink-400 fill-pink-300 stroke-pink-500 stroke-2 transform rotate-12" />
        </div>
        <div className="w-16 h-1 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full mx-auto"></div>
      </div>

      <div className="space-y-3 mb-6">
  {todaysItems.map((item) => (
    <div
      key={item._id}
      className="group flex items-center justify-between w-full p-4 rounded-2xl bg-white/60 hover:bg-white/80 transition-all duration-300"
    >
      {/* LEFT: Title + Time */}
      <div className="flex flex-col">
        <span className="text-gray-800 font-medium">{item.title}</span>

        {(item.startTime || item.endTime) && (
          <span className="text-xs text-gray-500">
            {item.startTime} — {item.endTime}
          </span>
        )}
      </div>

      {/* RIGHT: Priority + Type */}
      <div className="flex items-center gap-2">

        <span className={`
          text-xs px-2 py-1 rounded-full
          ${
            item.priority === "high"
              ? "bg-red-100 text-red-700"
              : item.priority === "medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }
        `}>
          {item.priority}
        </span>

        <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
          {item.type === "event" ? "Event" : "Task"}
        </span>

      </div>
    </div>
  ))}
</div>
      <div className="space-y-4">
         
          <button
            onClick={()=>navigate('/ToDoList')}
            className="w-full p-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
          >
            <Plus size={24} />
            Add task for your day
          </button>
        
      </div>

      
    </div> 

  );
};

export default TodoList;
