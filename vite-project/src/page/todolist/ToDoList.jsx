import React, { useState } from 'react';
import MonthlyPlans from './Month/MonthlyPlans.jsx';
import {Calendar} from './Day/Calendar.jsx';
import {WeeklyPlans} from './Week/WeeklyPlans.jsx';
import TaskView from './Day/TaskView.jsx';
function ToDoList() {
  const [selectedTask, setSelectedTask] = useState(null);
  return (
    
      <div className=" bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 h-470 md:h-430">
        <div className="max-w-5xl mx-auto space-y-0 ">
          {/* Monthly Goals Section */}
          <div className="">
            <MonthlyPlans />
          </div>
          
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-4  ">
            {/* Main Calendar Section */}
            <div className="lg:col-span-8 row-span-2">
         
              <div className="">
                <Calendar />
                
              </div>
             </div>

            {/* Weekly Planner Side Panel */}
           
            <div className="lg:col-span-4 ">
              <div className='mt-5 w-full md:w-[400px] md:ml-24'><WeeklyPlans/></div>
            </div>
     </div></div>
        </div>
   

  );
}

export default ToDoList;