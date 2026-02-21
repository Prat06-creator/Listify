import { Calendar, Clock, X } from 'lucide-react';


// interface JournalViewProps {
//   entry: JournalEntry;
//   onClose: () => void;
//   onEdit: () => void;
// }

export default function JournalView({ entry, onClose, onEdit, onDelete }) {
  const formatDate = (date) => {
  if (!date) return "No date";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "Invalid date";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(d);
};

const formatTime = (date) => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);
};


  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-100 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{entry.title || 'Untitled Entry'}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(entry.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{formatTime(entry.date)}</span>
            </div>
          </div>

          <div
            className="prose max-w-none text-gray-800 mb-6"
            dangerouslySetInnerHTML={{ __html: entry.content }}
          />

          {entry.photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {entry.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={onEdit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit Entry
            </button>
            <button onClick={onDelete} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Delete Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
