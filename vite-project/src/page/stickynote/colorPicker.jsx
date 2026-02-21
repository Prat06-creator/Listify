import React from 'react';
import { STICKY_NOTE_COLORS } from './constants/color';
import {useStickyStore} from "../../store/stickyStore.js"
// interface ColorPickerProps {
//   currentColor: string;
//   onColorChange: (color: string) => void;
//   isOpen: boolean;
//   onClose: () => void;
// }

export const ColorPicker = ({
isOpen,
currentColor,
  onClose, boardId,noteId
}) => {
  const {updateNote,boards,currentBoardId} = useStickyStore()
  if (!isOpen) return null;

  return (
    <div className="absolute top-8 left-0 bg-white rounded-lg shadow-lg border p-2 z-50">
      <div className="grid grid-cols-4 gap-2">
        {STICKY_NOTE_COLORS.map((color) => (
          <button
            key={color}
            className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
              currentColor === color ? 'border-gray-800' : 'border-gray-300'
            }`}
            style={{ backgroundColor: color }}
            onClick={() => {
              updateNote(boardId, noteId, { color })
              onClose();
            }}
          />
        ))}
      </div>
    </div>
  );
};