import React, { useEffect, useState } from 'react';
import { Target, Plus, Trash2 } from 'lucide-react';
import { GoalInput } from './GoalInput';
import { GoalList } from './GoalList';

import { useTodoStore } from '../../../store/todoStore';

function Month() {
  const { getAllTodos, currentTodo, addMonthlyGoal, updateMonthlyGoal, deleteMonthlyGoal, monthlyTasks} = useTodoStore();
  const [showInput, setShowInput] = useState(true);
  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className=" bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 ">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500 rounded-xl shadow-lg">
              <Target className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">MONTHLY GOALS:</h1>
              <p className="text-gray-600 text-base">Set your monthly goals to stay focused and motivated!</p>
            </div>
          </div>
          
          <button
            onClick={()=> setShowInput(true)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl text-sm"
          >
            <Plus size={16} />
            Add Goal
          </button>
        </div>

        {/* Goal Input */}
        <GoalInput 
         onAddGoal={(goalData) => {addMonthlyGoal(currentTodo._id, goalData);}} 
          isVisible={showInput}
          onCancel={() => setShowInput(false)}
        />

        {/* Goal List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-white/20 ">
          <GoalList
            goals={monthlyTasks}
            onUpdateGoal={updateMonthlyGoal}
            onDeleteGoal={deleteMonthlyGoal}
          />
        </div>

        {/* Footer */}
        
      </div>
    </div>
  );
}

export default Month;