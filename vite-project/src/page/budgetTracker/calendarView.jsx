

// interface CalendarViewProps {
//   selectedMonth: number;
//   selectedYear: number;
//   expenses: Expense[];
//   onDateClick: (date: string) => void;
// }

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarView({
  selectedMonth,
  selectedYear,
  expenses,
  onDateClick
}) {
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
  const today = new Date();
  const isCurrentMonth = today.getMonth() === selectedMonth && today.getFullYear() === selectedYear;

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

 const getExpensesForDay = (day) => {
  return expenses.filter(exp => {
    const expDate = new Date(exp.date);
    return (
      expDate.getDate() === day &&
      expDate.getMonth() === selectedMonth &&
      expDate.getFullYear() === selectedYear
    );
  });
};


  const getTotalForDay = (day) => {
    return getExpensesForDay(day).reduce((sum, exp) => sum + exp.amount, 0);
  };

  return (
    <div className="backdrop-blur-xl bg-white/50 rounded-3xl p-6 shadow-lg border border-white/60">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        {months[selectedMonth]} {String(selectedMonth + 1).padStart(2, '0')}.
      </h2>

      <div className="grid grid-cols-7 gap-2 mb-3">
        {daysOfWeek.map(day => (
          <div
            key={day}
            className="text-center py-2 text-sm font-semibold text-gray-600 bg-white/60 rounded-xl"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const isToday = isCurrentMonth && day === today.getDate();
          const total = getTotalForDay(day);
          const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

          return (
            <button
              key={day}
              onClick={() => onDateClick(new Date(selectedYear, selectedMonth, day))}
              className={`aspect-square rounded-2xl p-2 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center ${
                isToday
                  ? 'bg-gradient-to-br from-pink-300 via-peach-300 to-coral-300 text-white shadow-lg shadow-pink-300/50 ring-2 ring-pink-400'
                  : total > 0
                  ? 'bg-gradient-to-br from-lavender-200 to-pink-200 text-gray-700'
                  : 'bg-white/60 text-gray-600 hover:bg-white/80'
              }`}
            >
              <span className={`text-lg font-semibold ${isToday ? 'text-white' : ''}`}>
                {day}
              </span>
              {total > 0 && (
                <span className={`text-xs font-medium mt-1 ${
                  isToday ? 'text-white/90' : 'text-gray-600'
                }`}>
                  ₹{total.toFixed(0)}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
