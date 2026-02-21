import { Calendar, Sparkles } from 'lucide-react';

// interface BoardPreviewProps {
//   board: Board;
//   onClick: () => void;
// }

export default function BoardPreview({ board, onClick }) {
  const renderMiniItems = () => {
    const visibleItems = board.items.slice(0, 6);

    return visibleItems.map((item, index) => {
      const miniStyle = {
        position: 'absolute',
        left: `${(item.position.x / 10) % 80}%`,
        top: `${(item.position.y / 10) % 80}%`,
        transform: `rotate(${item.rotation / 2}deg) scale(0.4)`,
        zIndex: index
      };

      if (item.type === 'image') {
        return (
          <div
            key={item._id}
            style={miniStyle}
            className="w-12 h-12 bg-white border-2 border-white shadow-sm rounded"
          >
            <img
              src={item.content}
              alt=""
              className="w-full h-full object-cover rounded"
            />
          </div>
        );
      } else if (item.type === 'text') {
        return (
          <div
            key={item._id}
            style={miniStyle}
            className="bg-white/90 px-2 py-1 rounded text-[6px] shadow-sm max-w-[60px] truncate"
          >
            {(item.content||"").substring(0, 20)}
          </div>
        );
      } else if (item.type === 'sticker') {
        return (
          <div key={item._id} style={miniStyle} className="text-xl">
            {item.content}
          </div>
        );
      }
    });
  };

  return (
    <button
      onClick={onClick}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div
        className="relative h-48 overflow-hidden"
        style={{ backgroundColor: board.backgroundColor }}
      >
        {board.items.length > 0 ? (
          <div className="relative w-full h-full">
            {renderMiniItems()}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <Sparkles className="text-gray-300" size={40} />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-4 bg-gradient-to-br from-white to-pink-50">
        <div className="flex items-center gap-2 mb-1">
          <Calendar size={14} className="text-pink-600" />
          <span className="text-xs text-gray-500 font-medium">
            {board.type === 'year' ? board.period : `${board.period} ${new Date().getFullYear()}`}
          </span>
        </div>
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {board.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {board.items.length} {board.items.length === 1 ? 'item' : 'items'}
        </p>
      </div>
    </button>
  );
}
