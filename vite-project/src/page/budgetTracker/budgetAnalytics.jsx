

// interface BudgetAnalyticsProps {
//   expenses: Expense[];
//   targetBudget: number;
//   selectedMonth: number;
//   selectedYear: number;
// }

const categoryColors = {
  Food: 'from-pink-300 to-rose-300',
  Education: 'from-blue-300 to-cyan-300',
  Transport: 'from-purple-300 to-indigo-300',
  Bills: 'from-orange-300 to-amber-300',
  Shopping: 'from-green-300 to-emerald-300',
  Entertainment: 'from-yellow-300 to-lime-300',
  Others: 'from-gray-300 to-slate-300',
};

export default function BudgetAnalytics({
  expenses,
  targetBudget,
  selectedMonth,
  selectedYear
}) {
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);

  const dailyTotals = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayExpenses = expenses.filter(exp => exp.date === dateStr);
    return dayExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  });

  const cumulativeTotals = dailyTotals.reduce((acc, amount, index) => {
    acc.push((acc[index - 1] || 0) + amount);
    return acc;
  }, [] );

  const maxValue = Math.max(targetBudget, ...cumulativeTotals, 100);

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} );

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const categories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="backdrop-blur-xl bg-white/50 rounded-3xl p-6 shadow-lg border border-white/60">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Monthly Spending Trend</h3>
        <div className="relative h-64">
          <div className="absolute inset-0 flex items-end justify-between gap-1">
            {cumulativeTotals.map((total, index) => {
              const height = (total / maxValue) * 100;
              const isOverBudget = total > targetBudget;
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full relative group">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-300 ${
                        isOverBudget
                          ? 'bg-gradient-to-t from-red-400 to-pink-400'
                          : 'bg-gradient-to-t from-green-400 to-teal-400'
                      }`}
                      style={{ height: `${height}%`, minHeight: total > 0 ? '4px' : '0' }}
                    />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                      <div className="bg-gray-800 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
                        Day {index + 1}: ₹{total.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="absolute left-0 right-0 border-t-2 border-dashed border-coral-400"
            style={{ bottom: `${(targetBudget / maxValue) * 100}%` }}
          >
            <span className="absolute -top-3 right-0 text-xs font-semibold text-coral-600 bg-white/80 px-2 py-1 rounded-full">
              Target: ₹{targetBudget}
            </span>
          </div>
        </div>
      </div>

      <div className="backdrop-blur-xl bg-white/50 rounded-3xl p-6 shadow-lg border border-white/60">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Category Breakdown</h3>
        <div className="space-y-3">
          {categories.length > 0 ? (
            categories.map(([category, amount]) => {
              const percentage = (amount / totalSpent) * 100;
              return (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{category}</span>
                    <span className="text-sm font-bold text-gray-800">
                      ₹{amount.toFixed(2)} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="h-3 bg-white/60 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${categoryColors[category]} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <p className="text-sm">No expenses yet</p>
              <p className="text-xs mt-1">Click on a date to add expenses</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
