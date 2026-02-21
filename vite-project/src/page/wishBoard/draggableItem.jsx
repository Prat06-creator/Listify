import { useState, useRef, useEffect } from 'react';
import { Trash2, RotateCw } from 'lucide-react';

// interface DraggableItemProps {
//   item: BoardItem;
//   onUpdate: (id: string, updates: Partial<BoardItem>) => void;
//   onDelete: (id: string) => void;
//   isSelected: boolean;
//   onSelect: (id: string) => void;
// }

export default function DraggableItem({ item, onUpdate, onDelete, isSelected, onSelect }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const itemRef = useRef(null);

  const handleMouseDown = (e) => {
    if ((e.target).closest('.control-button')) return;

    e.stopPropagation();
    onSelect(item._id);
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - item.position.x,
      y: e.clientY - item.position.y
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStartPos.current.x;
    const newY = e.clientY - dragStartPos.current.y;

    onUpdate(item._id, {
      position: { x: newX, y: newY }
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing]);

  const handleRotate = () => {
    onUpdate(item._id, {
      
        rotation: (item.rotation + 15) % 360
      
    });
  };

  const handleResizeStart = (e) => {
    e.stopPropagation();
    setIsResizing(true);
    onSelect(item._id);
  };

  const handleResizeMove = (e) => {
    if (!isResizing || !itemRef.current) return;

    const rect = itemRef.current.getBoundingClientRect();
    const newWidth = Math.max(50, e.clientX - rect.left);
    const newHeight = Math.max(50, e.clientY - rect.top);

    onUpdate(item._id, {
      style: {
        ...item.style,
        width: newWidth,
        height: item.type === 'image' ? newHeight : item.style?.height
      }
    });
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResizeMove);
      return () => window.removeEventListener('mousemove', handleResizeMove);
    }
  }, [isResizing]);

  const renderContent = () => {
    switch (item.type) {
      case 'image':
        return (
          <img
            src={item.content}
            alt="Board item"
            className="w-full h-full object-cover"
            draggable={false}
          />
        );
      case 'text':
        return (
          <div
            className="w-full h-full p-4 whitespace-pre-wrap break-words"
            style={{
              fontSize: item.style?.fontSize || 16,
              fontFamily: item.style?.fontFamily || 'Caveat, cursive',
              color: item.style?.color || '#374151'
            }}
          >
            {item.content}
          </div>
        );
      case 'sticker':
        return (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            {item.content}
          </div>
        );
    }
  };

  return (
    <div
      ref={itemRef}
      className={`absolute cursor-move transition-shadow ${
        isSelected ? 'ring-2 ring-pink-400 shadow-lg' : 'shadow-md'
      } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{
        left: item.position.x,
        top: item.position.y,
        transform: `rotate(${item.rotation}deg) scale(${item.scale})`,
        zIndex: isSelected ? 1000 : item.zIndex || 1,
        width: item.style?.width || (item.type === 'text' ? 200 : 150),
        height: item.style?.height || (item.type === 'text' ? 'auto' : 150),
        minHeight: item.type === 'text' ? 50 : undefined
      }}
      onMouseDown={handleMouseDown}
    >
      <div className={`w-full h-full rounded-lg overflow-hidden ${
        item.type === 'image' ? 'border-8 border-white' : 'bg-white/90'
      }`}>
        {renderContent()}
      </div>

      {isSelected && (
        <div className="absolute -top-10 left-0 right-0 flex items-center justify-center gap-2">
          <button
            onClick={handleRotate}
            className="control-button p-2 bg-white rounded-full shadow-lg hover:bg-pink-50 transition-colors"
          >
            <RotateCw size={16} className="text-pink-600" />
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className="control-button p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      )}

      {isSelected && item.type !== 'sticker' && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 bg-pink-400 rounded-full cursor-nwse-resize"
          onMouseDown={handleResizeStart}
        />
      )}
    </div>
  );
}
