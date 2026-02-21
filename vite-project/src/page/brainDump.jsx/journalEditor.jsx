import { useState, useRef, useEffect } from 'react';
import { Bold, Italic, Underline, Image, X, Save } from 'lucide-react';
import { useBrainDumpStore } from '../../store/brainDumpStore';

// interface JournalEditorProps {
//   initialTitle?: string;
//   initialContent?: string;
//   initialPhotos?: string[];
//   initialBackgroundColor?: string;
//   initialCategory?: JournalCategory;
//   onSave: (title: string, content: string, photos: string[], backgroundColor: string, category: JournalCategory) => void;
//   onCancel: () => void;
// }

const colors = [
  '#FEE2E2', '#FED7AA', '#FEF08A', '#DCFCE7', '#E0F2FE', '#EDE9FE', '#FCE7F3', '#F3E8FF',
  '#FFE4E6', '#FFE5D9', '#FFFACD', '#E0F9E8', '#D1E7F0', '#DDD6FE', '#FAE8FF', '#EAE5FF',
];

const categoryOptions = ['travel', 'food', 'finance', 'emotions', 'general'];

export default function JournalEditor({
  initialTitle = '',
  initialContent = '',
  initialPhotos = [],
  initialBackgroundColor = '#E0F2FE',
  initialCategory = 'general',
  onSave,
  onCancel,
}) {
  const {createEntry, updateEntry, currentEntryId, setCurrentEntryId, getEntries, setEntries} = useBrainDumpStore();
  useEffect(() => {
    getEntries();
  }, []);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [photos, setPhotos] = useState(initialPhotos);
  const [backgroundColor, setBackgroundColor] = useState(initialBackgroundColor);
  const [category, setCategory] = useState(initialCategory);
  const contentRef = useRef(null);
  const fileInputRef = useRef(null);

  const applyStyle = (command) => {
    contentRef.current.focus();
    document.execCommand(command, false,null);
  };
  useEffect(() => {
  if (contentRef.current && initialContent) {
    contentRef.current.innerHTML = initialContent;
  }
}, []);


  const handlePhotoUpload = (e) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setPhotos((prev) => [...prev, event.target.result ]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };
  const handleSave = async () => {
    if(!title.trim()){
          alert("Please enter a title before saving ✨");
          return;
    }
    const contentHtml = contentRef.current?.innerHTML || '';
    await onSave(title, contentHtml, photos, backgroundColor, category);
    onCancel();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-[60] bg-black/30 backdrop-blur-sm">
  <div className="bg-white rounded-xl shadow-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto z-50 bg-opacity-100">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Entry Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-2xl font-semibold mb-4 px-4 py-3 border-b-2 border-gray-200 focus:border-blue-500 outline-none transition-colors"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value )}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <div className="flex gap-2 flex-wrap">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setBackgroundColor(color)}
                  style={{ backgroundColor: color }}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    backgroundColor === color ? 'border-gray-900 scale-110' : 'border-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
        <button
          onClick={() => applyStyle('bold')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Bold"
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          onClick={() => applyStyle('italic')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Italic"
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          onClick={() => applyStyle('underline')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Underline"
        >
          <Underline className="w-5 h-5" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-2" />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Add Photo"
        >
          <Image className="w-5 h-5" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoUpload}
          className="hidden"
        />
      </div>

      <div
        ref={contentRef}
        contentEditable
        className="min-h-[300px] p-4 mb-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
         style={{ backgroundColor }}
        suppressContentEditableWarning
      />

      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative group">
              <img
                src={photo}
                alt={`Upload ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => removePhoto(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Entry
        </button>
      </div>
    </div>
    </div></div>
  );
}
