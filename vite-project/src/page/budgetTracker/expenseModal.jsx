import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';


// interface ExpenseModalProps {
//   date: string;
//   expenses: Expense[];
//   onClose: () => void;
//   onAddExpense: (expense: Omit<Expense, 'id'>) => void;
//   onDeleteExpense: (id: string) => void;
// }

const categories = [
  'Food', 'Education', 'Transport', 'Bills', 'Shopping', 'Entertainment', 'Others'
];

export default function ExpenseModal({
  date,
  expenses,
  onClose,
  onAddExpense,
  onDeleteExpense
}) {
  const [purpose, setPurpose] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (purpose && amount) {
      onAddExpense({
        date,
        description: purpose,
        amount: parseFloat(amount),
        category,
      });
      setPurpose('');
      setAmount('');
      setCategory('Food');
    }
  };

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-slideUp border border-white/60">
        <div className="p-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-gray-800">{formattedDate}</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-200/50 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <p className="text-sm text-gray-600">
            Total spent: <span className="font-bold text-coral-600">₹{total.toFixed(2)}</span>
          </p>
        </div>

        <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Purpose
                </label>
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-pink-200/50 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
                  placeholder="What did you spend on?"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-pink-200/50 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Category
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                        category === cat
                          ? 'bg-gradient-to-r from-pink-300 to-peach-300 text-white shadow-lg'
                          : 'bg-white/60 text-gray-600 hover:bg-white/80'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-400 via-peach-400 to-coral-400 text-white font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Expense
              </button>
            </div>
          </form>

          {expenses.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700">Today's Expenses</h4>
              {expenses.map(expense => (
                <div
                  key={expense._id}
                  className="p-4 rounded-2xl bg-gradient-to-br from-lavender-100 to-pink-100 flex items-center justify-between group hover:shadow-md transition-all"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{expense.description}</p>
                    <p className="text-xs text-gray-600 mt-1">{expense.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-bold text-coral-600">
                      ₹{expense.amount.toFixed(2)}
                    </p>
                    <button
                      onClick={() => onDeleteExpense(expense._id)}
                      className="p-2 rounded-full bg-red-100 text-red-600 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
