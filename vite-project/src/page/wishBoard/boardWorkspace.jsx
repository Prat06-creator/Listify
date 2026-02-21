import { useState, useRef, useEffect } from 'react';
import DraggableItem from './draggableItem';
import { Type, Image, Sticker, Palette, ArrowLeft, Plus } from 'lucide-react';
import { useWishBoardStore } from '../../store/wishBoardStore';

const BACKGROUND_COLORS = [
  '#FFF5F5', '#FFF5EB', '#FFFBEB', '#FEF3C7', '#FEF9C3',
  '#ECFCCB', '#DCFCE7', '#D1FAE5', '#CCFBF1', '#CFFAFE',
  '#E0F2FE', '#DBEAFE', '#E0E7FF', '#EDE9FE', '#F3E8FF',
  '#FAE8FF', '#FCE7F3', '#FFE4E6', '#FFFFFF', '#F8F8F8'
];

const PATTERNS = [
  'dots', 'grid', 'diagonal', 'stripes', 'diamond', 'none'
];

const STICKER_EMOJIS = [
  '⭐', '💫', '✨', '🌟', '💖', '💝', '💗', '💕',
  '🌸', '🌺', '🌼', '🌻', '🌹', '🌷', '🪻', '🌿',
  '☀️', '🌙', '⛅', '🌈', '☁️', '⚡', '💭', '💬',
  '📌', '📍', '✏️', '📝', '✂️', '📎', '🎨', '🖍️'
];

export default function BoardWorkspace({ board, onUpdate, onBack }) {
  const {getBoards, updatesBoard,addsItem, updatesItem, deletesItem}= useWishBoardStore();
  const [items, setItems] = useState(board.items);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showBackgroundPicker, setShowBackgroundPicker] = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const workspaceRef = useRef(null);

  useEffect(() => {
    getBoards();
  }, []);

  const handlePaste = async (e) => {
    const clipboardItems = e.clipboardData?.items;
    if (!clipboardItems) return;

    for (const item of Array.from(clipboardItems)) {
      if (item.type.startsWith('image/')) {
        const blob = item.getAsFile();
        if (blob) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const imageUrl = event.target?.result ;
            addItem('image', imageUrl);
          };
          reader.readAsDataURL(blob);
        }
      } else if (item.type === 'text/plain') {
        item.getAsString((text) => {
          if (text.startsWith('http') && (text.includes('.jpg') || text.includes('.png') || text.includes('.gif') || text.includes('.jpeg') || text.includes('.webp'))) {
            addItem('image', text);
          }
        });
      }
    }
  };

  const addItem = async (type, content) => {
    const newItem= {
      type,
      position: { x: 100 + Math.random() * 200, y: 100 + Math.random() * 200 },
      size: type==='text'?{ width: 250, height: 60 }
      : type === 'sticker'
      ? { width: 80, height: 80 }
      : { width: 200, height: 200 },
      rotation:0,
      style: type === 'text' ? {
        fontSize: 24,
        fontFamily: 'Caveat, cursive',
        color: '#374151',
      } : {},    content,
    };
    const updatedBoard = await addsItem(board._id, newItem)
    if (updatedBoard) {
      setItems(updatedBoard.items);
    }
    setShowAddMenu(false);
    setShowStickerPicker(false);
  };

  const updateItem = async (id, updates) => {
    const updatedBoards = await updatesItem(board._id, id, updates);
    if (updatedBoards) {
      setItems(updatedBoards.items);
    }
  };

  const deleteItem = async (id) => {
    const updatedBoard = await deletesItem(board._id, id);
  if (updatedBoard) {
    setItems(updatedBoard.items);
    setSelectedItemId(null);
  }
  };

  const handleWorkspaceClick = (e) => {
    if (e.target === workspaceRef.current) {
      setSelectedItemId(null);
    }
  };

  const changeBackground = (color) => {
  updatesBoard(board._id, {
    style: {
      backgroundColor:color
    }
  });
};

const changePattern = (pattern) => {
  updatesBoard(board._id, {
    style: {
      pattern:pattern
    }
  });
};


  const getPatternStyle = (pattern) => {
    if (!pattern || pattern === "none") return "";
      const patterns = {
        dots: `radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)`,
        grid: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
        diagonal: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 20px)`,
        stripes: `repeating-linear-gradient(
    -45deg,
    rgba(0,0,0,0.08) 0 10px,
    transparent 10px 20px
  ),
  repeating-linear-gradient(
    45deg,
    rgba(0,0,0,0.08) 0 10px,
    transparent 10px 20px
  )`,
        diamond: `linear-gradient(45deg, transparent 45%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.12) 55%, transparent 55%),
  linear-gradient(-45deg, transparent 45%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.12) 55%, transparent 55%)`,
       
      }
      return patterns[pattern] || '';
      
   
  };

  const selectedItem = items.find(item => item._id === selectedItemId);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
            {board.name}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors shadow-md"
            >
              <Plus size={18} />
              Add Item
            </button>
            {showAddMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                <button
                  onClick={() => addItem('text', 'Click to edit...')}
                  className="w-full px-4 py-2 hover:bg-pink-50 flex items-center gap-3 transition-colors"
                >
                  <Type size={18} className="text-pink-600" />
                  <span>Add Text</span>
                </button>
                <button
                  onClick={() => setShowStickerPicker(!showStickerPicker)}
                  className="w-full px-4 py-2 hover:bg-pink-50 flex items-center gap-3 transition-colors"
                >
                  <Sticker size={18} className="text-pink-600" />
                  <span>Add Sticker</span>
                </button>
                <div className="px-4 py-2 text-sm text-gray-500 border-t mt-2">
                  <div className="flex items-center gap-2">
                    <Image size={16} />
                    <span>Paste images (Ctrl+V)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowBackgroundPicker(!showBackgroundPicker)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Palette size={20} />
          </button>
        </div>
      </div>

      {showBackgroundPicker && (
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Background Color</h3>
              <div className="flex flex-wrap gap-2">
                {BACKGROUND_COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => changeBackground(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                      board?.style?.backgroundColor === color ? 'border-pink-500 scale-110' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Pattern Overlay</h3>
              <div className="flex gap-2">
                {PATTERNS.map(pattern => (
                  <button
                    key={pattern}
                    onClick={() => changePattern(pattern)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      board?.style?.background?.type === 'pattern' && board?.style?.background?.value === pattern
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {pattern}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showStickerPicker && (
        <div className="absolute top-20 right-6 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50 w-80">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Choose a Sticker</h3>
          <div className="grid grid-cols-8 gap-2 max-h-64 overflow-y-auto">
            {STICKER_EMOJIS.map((emoji, index) => (
              <button
                key={index}
                onClick={() => addItem('sticker', emoji)}
                className="text-3xl hover:scale-125 transition-transform p-2 hover:bg-pink-50 rounded-lg"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedItem && selectedItem.type === 'text' && (
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={selectedItem.style?.fontSize || 24}
              onChange={(e) => updateItem(selectedItem._id, {
                style: { ...selectedItem.style, fontSize: parseInt(e.target.value) }
              })}
              className="w-20 px-2 py-1 border rounded"
              min="12"
              max="72"
            />
            <input
              type="color"
              value={selectedItem.style?.color || '#374151'}
              onChange={(e) => updateItem(selectedItem._id, {
                style: { ...selectedItem.style, color: e.target.value }
              })}
              className="w-12 h-8 rounded cursor-pointer"
            />
            <textarea
              value={selectedItem.content}
              onChange={(e) => updateItem(selectedItem._id, { content: e.target.value })}
              className="flex-1 px-3 py-2 border rounded-lg resize-none"
              rows={2}
              placeholder="Enter your text..."
            />
          </div>
        </div>
      )}

      <div
        ref={workspaceRef}
        className="flex-1 relative overflow-hidden"
        style={{
          backgroundColor: board?.style?.backgroundColor || '#E0F2FE',
          backgroundImage: getPatternStyle(board?.style?.pattern),
          backgroundSize:  "20px 20px",
        }}
        onPaste={handlePaste}
        onClick={handleWorkspaceClick}
        tabIndex={0}
      >
        {items.map(item => (
          <DraggableItem
            key={item._id}
            item={item}
            onUpdate={updateItem}
            onDelete={deleteItem}
            isSelected={item._id === selectedItemId}
            onSelect={setSelectedItemId}
          />
        ))}

        {items.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <p className="text-lg mb-2" style={{ fontFamily: 'Caveat, cursive', fontSize: '2rem' }}>
                Start creating your vision board!
              </p>
              <p className="text-sm">Add text, paste images, or add stickers to begin</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
