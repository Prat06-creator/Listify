import React, { useState, useRef, useEffect } from 'react';
import { X, Palette, Link, Edit3 } from 'lucide-react';
import { StickyNote as StickyNoteType } from './constants/index';
import { useDrag } from './constants/useDrag';
import { useResize } from './constants/useResize';
import { ColorPicker } from './colorPicker';
import {useStickyStore} from "../../store/stickyStore.js"
// interface StickyNoteProps {
//   note: StickyNoteType;
//   onUpdate: (id: string, updates: Partial<StickyNoteType>) => void;
//   onDelete: (id: string) => void;
//   onStartConnection: (noteId: string) => void;
//   isConnectionMode: boolean;
//   isConnectionSource: boolean;
// }

export const StickyNote = ({
  isConnectionMode,
  isConnectionSource,
  note,
  onStartConnection, canvasRef
}) => {
    const {connections,deleteConnections,deleteNote,updateNote,createNote,boards,colorChange,
      renameBoard,deleteBoard,createBoard,boardChange,currentBoardId,setCurrentBoardId,createConnection }= useStickyStore()
  
  const [isEditing, setIsEditing] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const textareaRef = useRef(null);
   const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
  const { position, isDragging, dragHandlers, mouseHandlers: dragMouseHandlers } = useDrag(
    { x: note.x, y: note.y },
    (pos) => updateNote(currentBoardId,note._id,{ x: pos.x, y: pos.y }),
    (pos) => updateNote(currentBoardId,note._id, { x: pos.x, y: pos.y })
  );

  const { size, isResizing, resizeHandlers, mouseHandlers: resizeMouseHandlers } = useResize(
    { width: note.width, height: note.height },
    (size) => updateNote(currentBoardId,note._id, { width: size.width, height: size.height }),
    (size) => updateNote(currentBoardId,note._id, { width: size.width, height: size.height })
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      dragMouseHandlers.onMouseMove(e);
      resizeMouseHandlers.onMouseMove(e);
    };

    const handleMouseUp = (e) => {
      dragMouseHandlers.onMouseUp();
      resizeMouseHandlers.onMouseUp();
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragMouseHandlers, resizeMouseHandlers]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  const handleTextChange = (text) => {
    updateNote(currentBoardId,note._id, { text });
  };


  const handleColorChange = (color) => {
    updateNote(currentBoardId,note._id, { color });
    setShowColorPicker(false);
  };

  const handleClick = () => {
    if (isConnectionMode) {
      onStartConnection(note._id);
    }
  };
  const isMobile = window.innerWidth < 768;

let finalX = position.x;
let finalY = position.y;

if (isMobile && canvasRef?.current) {
  const rect = canvasRef.current.getBoundingClientRect();

  finalX = clamp(
    position.x,
    8,
    rect.width - size.width - 8
  );

  finalY = clamp(
    position.y,
    8,
    rect.height - size.height - 8
  );
}

  return (
    <div
      className={`absolute select-none transition-all duration-200 ${
        isDragging ? 'scale-105 rotate-2' : ''
      } ${isConnectionMode ? 'cursor-crosshair' : 'cursor-move'} ${
        isConnectionSource ? 'ring-4 ring-blue-400 ring-opacity-50' : ''
      }`}
      style={{
        left: finalX,
        top: finalY,
        width: window.innerWidth < 768 ? Math.max(size.width, 150) : size.width,
        height: window.innerWidth < 768 ? Math.max(size.height, 150) : size.height,
        backgroundColor: note.color,
        zIndex: isDragging ? 1000 : 1,
      }}
      onClick={handleClick}
      {...dragHandlers}
    >
      <div className="w-full h-full rounded-lg shadow-lg   relative overflow-hidden hover:shadow-xl transition-shadow">
        {/* Header */}
        <div className="flex items-center justify-between p-2 bg-opacity-5">
          <div className="flex items-center gap-1">
            <div className="relative">
              <button
                className="w-6 h-6 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowColorPicker(!showColorPicker);
                }}
              >
                <Palette size={12} />
              </button>
              <ColorPicker
                currentColor={note.color}
                onColorChange={handleColorChange}
                isOpen={showColorPicker}
                onClose={() => setShowColorPicker(false)}
                boardId={currentBoardId}   
  noteId={note._id}       
              />
            </div>
            <button
              className="w-6 h-6 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow flex items-center justify-center hover:bg-blue-50"
              onClick={(e) => {
                e.stopPropagation();
                onStartConnection(note._id);
              }}
              title="Create connection"
            >
              <Link size={12} />
            </button>
            <button
              className="w-6 h-6 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow flex items-center justify-center hover:bg-green-50"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              title="Edit text"
            >
              <Edit3 size={12} />
            </button>
          </div>
          <button
            className="w-6 h-6 rounded-full bg-white shadow-sm hover:shadow-md hover:bg-red-50 transition-all flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              deleteNote(currentBoardId,note._id);
            }}
          >
            <X size={12} className="text-red-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 h-[calc(100%-40px)]">
          {isEditing ? (
            <textarea
              ref={textareaRef}
              value={note.text}
              onChange={(e) => handleTextChange(e.target.value)}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  setIsEditing(false);
                }
              }}
              className="w-full h-full resize-none border-none outline-none bg-transparent text-sm leading-relaxed"
              style={{ fontFamily: 'inherit' }}
              placeholder="Enter your note..."
            />
          ) : (
            <div
              className="w-full h-full text-sm leading-relaxed cursor-text"
            >
              {note.text || (
                <span className="text-gray-400 italic">Click to add text...</span>
              )}
            </div>
          )}
        </div>

        {/* Resize handle */}
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nw-resize  bg-opacity-50 hover:bg-opacity-70 transition-colors"
          style={{
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
          }}
          {...resizeHandlers}
        />
      </div>
    </div>
  );
};