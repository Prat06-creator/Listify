import { useEffect, useState } from 'react';
import { Search, Plus, BookOpen } from 'lucide-react';
import JournalEditor from './journalEditor';
import JournalEntryCard from './journalEntryCard';
import JournalView from './journalView';
import { useBrainDumpStore } from '../../store/brainDumpStore';
const categoryEmojis = {
  travel: '✈️',
  food: '🍽️',
  finance: '💰',
  emotions: '❤️',
  general: '📝',
};

export default function Journal() {
  const {entries, currentEntryId, setCurrentEntryId, createEntry, getEntries, updateEntry, entryChange} = useBrainDumpStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isEditing, setIsEditing] = useState(false);
  const [viewingEntry, setViewingEntry] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);
useEffect(() => {
  getEntries();
}, [])
  const handleSaveEntry = async (title, content, photos, backgroundColor, category) => {
    if (editingEntry) {
      // setEntries((prev) =>
      //   prev.map((entry) =>
      //     entry.id === editingEntry.id
      //       ? { ...entry, title, content, photos, backgroundColor, category }
      //       : entry
      //   )
      // );
      await updateEntry(editingEntry._id, {title, content, photos, backgroundColor, category});
      await getEntries();
      setEditingEntry(null);
    } else {
      const newEntry = {
        title,
        content,
        photos,
        backgroundColor,
        category, bold: false, italic: false, underline: false,
        date: new Date().toISOString(),
      };
      await createEntry(newEntry);
      await getEntries();
    }
    setIsEditing(false);
  };

  const handleEditEntry = (entry) => {
    updateEntry(entry._id, entry);
    setViewingEntry(null);
    setEditingEntry(entry);
    setIsEditing(true);
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || entry.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-fuchsia-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-rose-600" />
            <h1 className="text-4xl font-bold text-gray-900">Brain Dump</h1>
          </div>
        </div>

        {!isEditing && (
          <>
            <div className="mb-8 flex flex-col gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search entries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all shadow-sm"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  All
                </button>
                {['travel', 'food', 'finance', 'emotions', 'general'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat )}
                    className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                      selectedCategory === cat
                        ? 'bg-gray-900 text-white shadow-lg'
                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <span>{categoryEmojis[cat]}</span>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white rounded-xl hover:from-rose-600 hover:to-fuchsia-600 transition-all flex items-center gap-2 shadow-md hover:shadow-lg font-medium"
              >
                <Plus className="w-5 h-5" />
                New Entry
              </button>
            </div>

            {filteredEntries.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {searchQuery ? 'No entries found' : 'No entries yet'}
                </h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery
                    ? 'Try adjusting your search'
                    : 'Start writing your first journal entry'}
                </p>
                {!searchQuery && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white rounded-xl hover:from-rose-600 hover:to-fuchsia-600 transition-all shadow-md"
                  >
                    <Plus className="w-5 h-5" />
                    Create Entry
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEntries.map((entry) => (
                  <JournalEntryCard
                    key={entry._id}
                    entry={entry}
                    onClick={() => setViewingEntry(entry)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {isEditing && (
          <JournalEditor
            initialTitle={editingEntry?.title}
            initialContent={editingEntry?.content}
            initialPhotos={editingEntry?.photos}
            initialBackgroundColor={editingEntry?.backgroundColor}
            initialCategory={editingEntry?.category}
            onSave={handleSaveEntry}
            onCancel={() => {
              setIsEditing(false);
              setEditingEntry(null);
            }}
          />
        )}

        {viewingEntry && (
          <JournalView
            entry={viewingEntry}
            onClose={() => setViewingEntry(null)}
            onEdit={() => handleEditEntry(viewingEntry)}
            onDelete={async () => {
              await useBrainDumpStore.getState().deleteEntry(viewingEntry._id);
              setViewingEntry(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
