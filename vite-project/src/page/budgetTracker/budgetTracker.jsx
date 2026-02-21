import { useState } from 'react';
import MonthSidebar from './monthSidebar';
import CalendarView from './calendarView';
import ExpenseModal from './expenseModal';
import BudgetAnalytics from './budgetAnalytics';
import BudgetSummary from './budgetSummary';
import { useEffect } from 'react';
import { useBudgetTrackerStore } from '../../store/budgetTracker';
import BudgetTrackerCard from '../dashboard/budgetTracker';
// export interface Expense {
//   id: string;
//   date: string;
//   purpose: string;
//   amount: number;
//   category: string;
// }

function BudgetTracker() {
  const {getExpense, addBudget, budgets, addExpense, expenses, deleteExpense}= useBudgetTrackerStore()
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear] = useState(new Date().getFullYear());
  const [targetBudget, setTargetBudget] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    getExpense()
  }, []);

  const currentBudget = budgets?.find(
  (b) => b.month === selectedMonth && b.year === selectedYear
);
const monthExpenses = currentBudget?.expenses||[]
useEffect(() => {
  if (currentBudget) {
    setTargetBudget(currentBudget.budget);
  } else {
    setTargetBudget(0);
  }
}, [currentBudget]);

const handleAddBudget = async (budget) => {
  const res = await addBudget(selectedMonth, selectedYear, budget);
  if (res) {
    setTargetBudget(res.budget);
  }
};

  const handleAddExpense = async ({date, amount, description, category}) => {
    if (!currentBudget) {
    alert("Please set a budget first");
    return;
  }

  await addExpense(
    selectedMonth,
    selectedYear,
    date,
    amount,
    description,
    category
  );
  };

  const handleDeleteExpense = async(id) => {
    await deleteExpense(id);
  };
  const totalSpent = monthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = targetBudget - totalSpent;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-yellow-300 to-blue-400 p-6">
      <div className="max-w-7xl mx-auto flex gap-6 h-[calc(100vh-3rem)]">
        <MonthSidebar
          selectedMonth={selectedMonth}
          onMonthSelect={setSelectedMonth}
        />

        <div className="flex-1 flex flex-col gap-6 overflow-y-auto">
          <BudgetSummary
            targetBudget={targetBudget}
            totalSpent={totalSpent}
            remaining={remaining}
            onBudgetSave={handleAddBudget}
          />

          <CalendarView
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            expenses={monthExpenses}
            onDateClick={setSelectedDate}
          />

          <BudgetAnalytics
            expenses={monthExpenses}
            targetBudget={targetBudget}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
        </div>
      </div>

      {selectedDate && (
        <ExpenseModal
  date={selectedDate}
  expenses={monthExpenses.filter(
    exp => new Date(exp.date).toDateString() === selectedDate.toDateString()
  )}
  onClose={() => setSelectedDate(null)}
  onAddExpense={handleAddExpense}
  onDeleteExpense={handleDeleteExpense}
/>

      )}
     
 
    </div>
  );
}

export default BudgetTracker;