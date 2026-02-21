import React, { useState } from 'react';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import { Board } from './constants/index';
import {useStickyStore} from "../../store/stickyStore"
export const BoardSelector = (

) => {
  const {boards,renameBoard,deleteBoard,createBoard,boardChange,currentBoardId,setCurrentBoardId }= useStickyStore()
  const [isOpen, setIsOpen] = useState(false);
  const [editingBoard, setEditingBoard] = useState(null);
  const [editName, setEditName] = useState('');

  const currentBoard = boards.find(b => b._id === currentBoardId);

  const handleRename = (boardId) => {
    const board = boards.find(b => b._id === boardId);
    if (board) {
      setEditingBoard(boardId);
      setEditName("Untitled");
      // setIsOpen(false); // Close dropdown when editing
    }
  };

  const confirmRename = () => {
    if (editingBoard && editName.trim()) {
      renameBoard(editingBoard, editName.trim());
    }
    setEditingBoard(null);
    setEditName('');
  };

  const cancelRename = () => {
    setEditingBoard(null);
    setEditName('');
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{currentBoard?.name || 'Select Board'}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border min-w-[200px] z-50">
          <div className="p-2">
            <button
              className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
              onClick={() => {
                createBoard(); //function call
                setIsOpen(false);
              }}
            >
              <Plus size={16} />
              <span>Add New Board</span>
            </button>
          </div>
          
          <div className="border-t max-h-60 overflow-y-auto">
            {boards.map((board) => (
              <div key={board._id} className="p-2">
                {editingBoard === board._id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') confirmRename();
                        if (e.key === 'Escape') cancelRename();
                      }}
                      onBlur={confirmRename}
                      className="flex-1 px-2 py-1 border rounded text-sm"
                      autoFocus
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-between group">
                    <button
                      className={`flex-1 text-left px-3 py-2 rounded-lg transition-colors ${
                        board.id === currentBoardId
                          ? 'bg-blue-100 text-blue-700'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        boardChange(board._id);
                        setIsOpen(false);
                      }}
                    >
                      <div className="font-medium">
                        {board.name}                      </div>
                      <div className="text-xs text-gray-500">
                        {board.notes.length} notes • {board.connections.length} connections
                      </div>
                    </button>
                    
                    <div className="flex items-center gap-1">
                      <button
                        className="p-1 rounded hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRename(board._id);
                        }}
                        title="Rename board"
                      >
                        <span className="text-xs text-blue-500">✏️</span>
                      </button>
                      {boards.length > 1 && (
                        <button
                          className="p-1 rounded hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteBoard(board._id);
                          }}
                          title="Delete board"
                        >
                          <Trash2 size={14} className="text-red-500" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
