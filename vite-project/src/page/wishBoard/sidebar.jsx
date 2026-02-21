import { useState, useEffect} from 'react';
import { ChevronDown, ChevronRight, Plus, Home, Trash2, Edit } from 'lucide-react';
import { useWishBoardStore } from '../../store/wishBoardStore';
// interface SidebarProps {
//   boards: Board[];
//   onSelectBoard: (board: Board) => void;
//   onCreateBoard: (type: 'year' | 'month', period: string) => void;
//   onGoHome: () => void;
// }
 const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function Sidebar({ boards, onSelectBoard, onCreateBoard, onGoHome, onDeleteBoard, onRenameBoard }) {
  const {getBoards}= useWishBoardStore();
   useEffect(() => {
      getBoards();
    }, []);
  const [isMonthsExpanded, setIsMonthsExpanded] = useState(true);
  const currentYear = new Date().getFullYear();

  const yearBoards = boards.filter(b => b.type === 'year' && b.period === currentYear.toString());
  const getMonthBoards = (month) => boards.filter(b => b.type === 'month' && b.period === month);

  return (
    <div className="w-80 bg-gradient-to-b from-pink-50 to-orange-50 border-r border-pink-100 h-screen overflow-y-auto">
      <div className="p-6">
        <button
          onClick={onGoHome}
          className="flex items-center gap-3 w-full px-4 py-3 mb-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all group"
        >
          <Home size={20} className="text-pink-600 group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-gray-700">Home</span>
        </button>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
              {currentYear}
            </h2>
            <button
              onClick={() => onCreateBoard('year', currentYear.toString())}
              className="p-2 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-pink-50 transition-all"
            >
              <Plus size={16} className="text-pink-600" />
            </button>
          </div>
          <div className="space-y-2 mb-4">
  {yearBoards.map(board => (
    <div key={board._id} className="flex items-center gap-2">
      <button
        onClick={() => onSelectBoard(board._id)}
        className="flex-1 text-left px-4 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all group"
      >
        <span className="text-sm text-gray-700 group-hover:text-pink-600 transition-colors">
          {board.name}
        </span>
      </button>
      <button onClick={() => onRenameBoard(board._id)} className="p-2 bg-white rounded-full hover:bg-pink-50 transition-colors">
        <Edit size={14} className="text-pink-600"/></button>
      <button
        onClick={() => onDeleteBoard(board._id)}
        className="p-2 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
      >
        <Trash2 size={14} className="text-red-600" />
      </button>
    </div>
  ))}
</div>

        </div>

        <div>
          <button
            onClick={() => setIsMonthsExpanded(!isMonthsExpanded)}
            className="flex items-center justify-between w-full mb-3 group"
          >
            <h3 className="text-lg font-semibold text-gray-700">Months</h3>
            {isMonthsExpanded ? (
              <ChevronDown size={20} className="text-gray-500 group-hover:text-pink-600 transition-colors" />
            ) : (
              <ChevronRight size={20} className="text-gray-500 group-hover:text-pink-600 transition-colors" />
            )}
          </button>

          {isMonthsExpanded && (
            <div className="space-y-3">
              {MONTHS.map(month => {
                const monthBoards = getMonthBoards(month);
                return (
                  <div key={month} className="bg-white/60 rounded-xl p-3 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{month}</span>
                      <button
                        onClick={() => onCreateBoard('month', month)}
                        className="p-1 hover:bg-pink-50 rounded-full transition-colors"
                      >
                        <Plus size={14} className="text-pink-600" />
                      </button>
                    </div>
                    <div className="space-y-2 mb-4">
                    {monthBoards.length > 0 && (
                      <div className="space-y-1">
                        {monthBoards.map(board => (
                          <div key={board._id} className="flex items-center gap-2">
                          <button
                            onClick={() => onSelectBoard(board._id)}
                            className="w-full text-left px-3 py-2 bg-white rounded-lg text-xs hover:bg-pink-50 transition-colors"
                          >
                           <span className="text-sm text-gray-700 group-hover:text-pink-600 transition-colors">
          {board.name}
        </span>
                          </button>
                          <button onClick={() => onRenameBoard(board._id)} className="p-2 bg-white rounded-full hover:bg-pink-50 transition-colors">
        <Edit size={14} className="text-pink-600"/></button>
      <button
        onClick={() => onDeleteBoard(board._id)}
        className="p-2 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
      >
        <Trash2 size={14} className="text-red-600" />
      </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>  
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
