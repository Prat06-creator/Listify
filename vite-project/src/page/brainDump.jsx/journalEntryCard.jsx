import { Calendar, Clock } from 'lucide-react';
const categoryEmojis = {
  travel: '✈️',
  food: '🍽️',
  finance: '💰',
  emotions: '❤️',
  general: '📝',
};

export default function JournalEntryCard({ entry, onClick }) {
 const formatDate = (date) => {
  const d = new Date(date);
  if (isNaN(d)) return 'Invalid Date';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(d);
};

  const formatTime = (date) => {
  if (!date) return ""; // safe for undefined/null
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);
};


  const getPreview = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: entry.backgroundColor }}
      className="rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer p-5 hover:border-opacity-60"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-semibold text-gray-900 line-clamp-1 flex-1">
          {entry.title || 'Untitled Entry'}
        </h3>
        <span className="text-xl ml-2">{categoryEmojis[entry.category]}</span>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-700 mb-3">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(entry.date)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{formatTime(entry.date)}</span>
        </div>
      </div>

      <p className="text-gray-700 line-clamp-2 mb-3">
        {getPreview(entry.content)}
      </p>

      {entry.photos.length > 0 && (
        <div className="flex gap-2 mt-3">
          {entry.photos.slice(0, 3).map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt=""
              className="w-16 h-16 object-cover rounded"
            />
          ))}
          {entry.photos.length > 3 && (
            <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-sm text-gray-600">
              +{entry.photos.length - 3}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
