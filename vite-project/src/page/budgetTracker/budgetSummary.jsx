import { TrendingDown, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
// interface BudgetSummaryProps {
//   targetBudget: number;
//   totalSpent: number;
//   remaining: number;
//   onBudgetChange: (budget: number) => void;
// }

export default function BudgetSummary({
  targetBudget,
  totalSpent,
  remaining,
  onBudgetSave
}) {
    const [localBudget, setLocalBudget] = useState(targetBudget);   
  const percentage = (totalSpent / targetBudget) * 100;
  const isOverBudget = remaining < 0;

  useEffect(() => {
    setLocalBudget(targetBudget);
  }, [targetBudget]);

  return (
    <div className="backdrop-blur-xl bg-white/50 rounded-3xl p-6 shadow-lg border border-white/60">
      <div className="flex flex-wrap gap-6 items-center">
        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Target Budget
          </label>
          <div className="relative">
            <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={localBudget}
              onChange={(e) => setLocalBudget(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/70 border border-pink-200/50 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
              placeholder="Enter budget"
            />
            <button
        onClick={() => onBudgetSave(Number(localBudget))} // SAVE ON CLICK
        className="mt-3 px-4 py-2 bg-pink-500 text-white rounded-xl"
      >
        Save Budget
      </button>
          </div>
        </div>

        <div className="flex-1 min-w-[200px]">
          <p className="text-sm font-medium text-gray-600 mb-2">Total Spent</p>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-coral-200 to-peach-200">
              <TrendingUp className="w-5 h-5 text-coral-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">
              ₹{totalSpent.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex-1 min-w-[200px]">
          <p className="text-sm font-medium text-gray-600 mb-2">Remaining</p>
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-xl ${
              isOverBudget
                ? 'bg-gradient-to-br from-red-200 to-pink-200'
                : 'bg-gradient-to-br from-green-200 to-teal-200'
            }`}>
              <TrendingDown className={`w-5 h-5 ${
                isOverBudget ? 'text-red-600' : 'text-green-600'
              }`} />
            </div>
            <p className={`text-2xl font-bold ${
              isOverBudget ? 'text-red-600' : 'text-green-600'
            }`}>
              ₹{Math.abs(remaining).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="h-3 bg-white/60 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                percentage >= 100
                  ? 'bg-gradient-to-r from-red-400 to-pink-400'
                  : percentage >= 80
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
                  : 'bg-gradient-to-r from-green-400 to-teal-400'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 text-right">
            {percentage.toFixed(1)}% of budget used
          </p>
        </div>
      </div>
    </div>
  );
}
