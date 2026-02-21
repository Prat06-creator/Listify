import { TrendingUp, TrendingDown } from 'lucide-react';
import {useNavigate} from "react-router-dom";
const BudgetTrackerCard = ({
  total,
  spent,
  remaining, expenses=[]
}) => {
   const expenseColors = {
    Food: 'bg-green-500',
    Transport: 'bg-blue-500',
    Entertainment: 'bg-purple-500',
    Bills: 'bg-yellow-500',
    Shopping: 'bg-pink-500',
    Education: 'bg-indigo-500',
    Others: 'bg-gray-500',
   }

  const percentage = total > 0 ? (spent / total) * 100 : 0;
  const navigate=useNavigate();
  return (
    <div className="bg-[linear-gradient(135deg,#FF9BEF_0%,#FF4FD4_100%)] rounded-3xl p-6 shadow-lg h-132 w-90 ml-1 mt-1">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-white/20 p-3 rounded-full">
          <p className=" text-white text-4xl text-center">₹</p>
        </div>
        <button onClick={() => navigate('/budgetTracker')} className="text-2xl font-bold text-white">Budget Tracker</button>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white/80 text-lg">Monthly Budget</span>
          <span className="text-white font-bold">₹{total}</span>
        </div>

        <div className="w-full bg-white/20 rounded-full h-3 mb-2">
          <div
            className="bg-white rounded-full h-3 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-1">
            <TrendingDown className="w-4 h-4 text-white" />
            <span className="text-white">Spent: ₹{spent}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-white" />
            <span className="text-white">Left: ₹{remaining}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {expenses?.map((expense) => (
          <div
            key={expense._id}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/20 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${expenseColors[expense.category] || 'bg-gray-500'}`}></div>
          
                <span className="text-white text-md">{expense.category}</span>
              </div>
              <span className="text-white font-semibold">₹{expense.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetTrackerCard;
