// interface MonthSidebarProps {
//   selectedMonth: number;
//   onMonthSelect: (month: number) => void;
// }

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function MonthSidebar({ selectedMonth, onMonthSelect }) {
  return (
    <div className="w-48 flex-shrink-0">
      <div className="sticky top-0 backdrop-blur-xl bg-white/40 rounded-3xl p-4 shadow-lg border border-white/50">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 px-2">Months</h2>
        <div className="space-y-2">
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => onMonthSelect(index)}
              className={`w-full px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedMonth === index
                  ? 'bg-gradient-to-r from-pink-300 via-peach-300 to-coral-300 text-white shadow-lg scale-105 shadow-pink-300/50'
                  : 'bg-white/60 text-gray-600 hover:bg-white/80 hover:scale-102'
              }`}
            >
              {month}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
