import BoardPreview from './boardPreview';
import { Sparkles, Heart } from 'lucide-react';

// interface HomeScreenProps {
//   boards: Board[];
//   onSelectBoard: (board: Board) => void;
// }
export const BACKGROUND_COLORS = [
  '#FFF5F5', '#FFF5EB', '#FFFBEB', '#FEF3C7', '#FEF9C3',
  '#ECFCCB', '#DCFCE7', '#D1FAE5', '#CCFBF1', '#CFFAFE',
  '#E0F2FE', '#DBEAFE', '#E0E7FF', '#EDE9FE', '#F3E8FF',
  '#FAE8FF', '#FCE7F3', '#FFE4E6', '#FFFFFF', '#F8F8F8'
];

export const PATTERNS = [
  'dots', 'grid', 'diagonal', 'hearts', 'stars', 'none'
];

export const STICKER_EMOJIS = [
  '⭐', '💫', '✨', '🌟', '💖', '💝', '💗', '💕',
  '🌸', '🌺', '🌼', '🌻', '🌹', '🌷', '🪻', '🌿',
  '☀️', '🌙', '⛅', '🌈', '☁️', '⚡', '💭', '💬',
  '📌', '📍', '✏️', '📝', '✂️', '📎', '🎨', '🖍️'
];

export default function Home({ boards, onSelectBoard }) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const previousYear = currentYear - 1;
  const previousMonthDate = new Date();
  previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
  const previousMonth = previousMonthDate.toLocaleString('default', { month: 'long' });

  const previousYearBoards = boards.filter(b => b.type === 'year' && b.period === previousYear.toString());
  const previousMonthBoards = boards.filter(b => b.type === 'month' && b.period === previousMonth);
  const currentYearBoards = boards.filter(b => b.type === 'year' && b.period === currentYear.toString());
  const currentMonthBoards = boards.filter(b => b.type === 'month' && b.period === currentMonth);

  const allBoards = [
    ...currentYearBoards,
    ...currentMonthBoards,
    ...previousYearBoards,
    ...previousMonthBoards
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-pink-500" size={32} />
            <h1 className="text-5xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
              My Wishboards
            </h1>
            <Heart className="text-pink-500 fill-pink-500" size={32} />
          </div>
          <p className="text-gray-600 text-lg">
            Your creative space for dreams, goals, and inspiration
          </p>
        </div>

        {allBoards.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-6">
              <Sparkles className="mx-auto text-pink-300" size={64} />
            </div>
            <h2 className="text-3xl font-semibold text-gray-700 mb-3" style={{ fontFamily: 'Caveat, cursive' }}>
              Start Your Journey
            </h2>
            <p className="text-gray-500 mb-8">
              Create your first vision board from the sidebar
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                  <span className="text-pink-600 font-semibold">1</span>
                </div>
                <span>Choose a year or month</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                  <span className="text-pink-600 font-semibold">2</span>
                </div>
                <span>Click the + button</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                  <span className="text-pink-600 font-semibold">3</span>
                </div>
                <span>Start creating</span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {previousYearBoards.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
                  <span style={{ fontFamily: 'Caveat, cursive' }}>
                    {previousYear} Memories
                  </span>
                  <Sparkles className="text-pink-400" size={20} />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {previousYearBoards.map(board => (
                    <BoardPreview
                      key={board._id}
                      board={board}
                      onClick={() => onSelectBoard(board._id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {previousMonthBoards.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
                  <span style={{ fontFamily: 'Caveat, cursive' }}>
                    {previousMonth} Highlights
                  </span>
                  <Sparkles className="text-pink-400" size={20} />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {previousMonthBoards.map(board => (
                    <BoardPreview
                      key={board._id}
                      board={board}
                      onClick={() => onSelectBoard(board._id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {(currentYearBoards.length > 0 || currentMonthBoards.length > 0) && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
                  <span style={{ fontFamily: 'Caveat, cursive' }}>
                    Current Boards
                  </span>
                  <Heart className="text-pink-500 fill-pink-500" size={20} />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...currentYearBoards, ...currentMonthBoards].map(board => (
                    <BoardPreview
                      key={board._id}
                      board={board}
                      onClick={() => onSelectBoard(board._id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
