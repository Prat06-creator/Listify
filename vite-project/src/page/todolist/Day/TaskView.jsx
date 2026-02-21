import React, { useState } from 'react';
import { Clock, Plus, Edit3, Trash2 } from 'lucide-react';
import { useTodoStore } from '../../../store/todoStore';


const priorityColors = {
  high: 'bg-red-500',
  medium: 'bg-orange-500',
  low: 'bg-green-500',};

function TaskView({tasks, events}) {
    if (!tasks) return null;
    const {dailyTasks}= useTodoStore()
 
  return (
    
    <div className="mt-6 w-full md:-mt-130 md:ml-260 md:w-100 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 p-6">
      <div className="mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Task and Event Manager</h1>
        </div>
        {tasks.map((tasks) => (
<div className="space-y-4">
          
              <div className="flex items-start">
                <div className={`${priorityColors[tasks.priority]} text-white px-4 py-2 rounded-l-lg relative z-10 shadow-lg`}>
                
                </div>
                <div className="bg-gray-50 flex-1 p-6 relative shadow-lg" 
                     style={{
                       clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                       marginLeft: '-1px'
                     }}>
                  <div className="absolute top-2 right-2 flex gap-2">
                  
                  </div>
                  
                  <div className="pr-16">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">{tasks.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium text-white ${priorityColors[tasks.priority]}`}>
                    {tasks.priority}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3 leading-relaxed">{tasks.description}</p>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={16} className="mr-2" />
                      <span className="font-medium">{tasks.startTime} - {tasks.endTime}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-8 right-0 h-2 bg-gray-300 opacity-30 transform skew-x-1"></div>
            </div>
            ))}
{events.map((events) => (
<div className="space-y-4">
          
              <div className="flex items-start">
                <div className="bg-gray-50 flex-1 p-6 relative shadow-lg" 
                     style={{
                       clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                       marginLeft: '-1px'
                     }}>
                  <div className="absolute top-2 right-2 flex gap-2">
                  
                  </div>
                  
                  <div className="pr-16">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">{events.title}</h3>
                     
                    </div>
                    
                    <p className="text-gray-600 mb-3 leading-relaxed">{events.description}</p>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={16} className="mr-2" />
                      <span className="font-medium">{events.startTime} - {events.endTime}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-8 right-0 h-2 bg-gray-300 opacity-30 transform skew-x-1"></div>
            </div>
            ))}

      </div> </div>
        
    

  ); 
}
   
export default TaskView;