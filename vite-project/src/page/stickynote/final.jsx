import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Board, StickyNote, Connection } from './constants/index';
import { BoardSelector } from './boardSelector';
import { BoardCanvas } from './boardCanvas';
import { getRandomColor } from './constants/color';
import { useStickyStore } from '../../store/stickyStore.js';

const Final = () => {
const {getAllBoards,boardChange, boards, setBoards, createBoard, deleteBoard, renameBoard, createNote, deleteNote, updateNote, createConnection, deleteConnection, currentBoardId, setCurrentBoardId} = useStickyStore();
const [currentBoardIndex, setCurrentBoardIndex] = useState(0);
const currentBoard = boards.find(b => b._id === currentBoardId);

  useEffect(() => {
    getAllBoards();
  }, []);

  useEffect(() => {
    if (boards.length === 0) {
      createBoard();
    } else if (currentBoardIndex >= boards.length) {
      setCurrentBoardIndex(boards.length - 1);
    }
  }, [boards]);

  
  useEffect(() => {
    
    if (boards.length > 0 && currentBoardIndex < boards.length) {
      setCurrentBoardId(boards[currentBoardIndex]._id);
    }
  }, [setBoards]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const updateBoard = (boardId, updates) => {
    renameBoard(boardId, updates.name);
  };

  const handleCreateBoard = async () => {
    const newBoard = await createBoard();
    await getAllBoards();
    // setBoards([...boards, newBoard]);
    setCurrentBoardIndex(boards.length);
  };

  const handleDeleteBoard = async (boardId) => {
   await deleteBoard(boardId);
    await getAllBoards();
    if (currentBoardIndex >= boards.length - 1) {
      setCurrentBoardIndex(boards.length - 2 >= 0 ? boards.length - 2 : 0);
    }
  };

  const handleRenameBoard = async (boardId, name) => {
    await renameBoard(boardId, { name });
    await getAllBoards();
  };

  const handleBoardChange = (boardId) => {
   boardChange(boardId);
    const newIndex = boards.findIndex(b => b._id === boardId);
    setCurrentBoardIndex(newIndex);
  };

  const navigateBoard = (direction) => {
    if (direction === 'prev' && currentBoardIndex > 0) {
      setCurrentBoardIndex(currentBoardIndex - 1);
    } else if (direction === 'next' && currentBoardIndex < boards.length - 1) {
      setCurrentBoardIndex(currentBoardIndex + 1);
    }
  };

  const handleUpdateNote = (noteId, updates) => {
   updateNote(noteId, updates);
    const updatedNotes = currentBoard.notes.map(note => {
      if (note._id === noteId) {
        return { ...note, ...updates };
      }
      return note;
    });
    if (!updatedNotes.some(note => note.id === noteId)) {
      return;
    }
    updateBoard(currentBoard.id, { notes: updatedNotes });
  };

  const handleDeleteNote = (noteId) => {
    deleteNote(noteId);
    updateBoard(currentBoard.id, {
      notes: currentBoard.notes.filter(note => note._id !== noteId),
    });
  };
  const handleCreateConnection = async (fromNoteId, toNoteId) => {
    await createConnection(currentBoard._id, fromNoteId, toNoteId);
  };

  const handleDeleteConnection = async  (connectionId) => {
    deleteConnection(currentBoard._id, connectionId);
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      {/* <header className="flex items-center justify-between p-6 bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => navigateBoard('prev')}
            disabled={currentBoardIndex === 0}
          >
            <ChevronLeft size={24} />
          </button>
          
          <BoardSelector
            boards={boards}
            currentBoardId={currentBoard?._id}
            boardChange={handleBoardChange}
            createBoard={handleCreateBoard}
            deleteBoard={handleDeleteBoard}
            renameBoard={handleRenameBoard}
          />
          
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => navigateBoard('next')}
            disabled={currentBoardIndex === boards.length - 1}
          >
            <ChevronRight size={24} />
          </button>
          
          <button
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors text-sm font-medium"
            onClick={() => {
              const boardIndex = boards.findIndex(b => b.id === currentBoard.id);
              if (boardIndex !== -1) {
                const newName = prompt('Enter new board name:', currentBoard.name);
                if (newName && newName.trim()) {
                  handleRenameBoard(currentBoard.id, newName.trim());
                }
              }
            }}
          >
            Rename Board
          </button>
        </div>

        <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
         {currentBoard
  ? `${currentBoard.notes?.length||0} notes • ${currentBoard.connections?.length||0} connections`
  : "0 notes • 0 connections"}
</div>
      </header> */}

      <header className="bg-white shadow-sm">

  {/* DESKTOP HEADER (unchanged) */}
  <div className="hidden md:flex items-center justify-between p-6">
    <div className="flex items-center gap-4">
      <button
        className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
        onClick={() => navigateBoard('prev')}
        disabled={currentBoardIndex === 0}
      >
        <ChevronLeft size={24} />
      </button>

      <BoardSelector
        boards={boards}
        currentBoardId={currentBoard?._id}
        boardChange={handleBoardChange}
        createBoard={handleCreateBoard}
        deleteBoard={handleDeleteBoard}
        renameBoard={handleRenameBoard}
      />

      <button
        className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
        onClick={() => navigateBoard('next')}
        disabled={currentBoardIndex === boards.length - 1}
      >
        <ChevronRight size={24} />
      </button>

      <button
        className="px-4 py-2 bg-green-500 text-white rounded-full text-sm"
        onClick={() => {
          const newName = prompt('Enter new board name:', currentBoard.name);
          if (newName) handleRenameBoard(currentBoard.id, newName);
        }}
      >
        Rename Board
      </button>
    </div>

    <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
      {currentBoard
        ? `${currentBoard.notes?.length || 0} notes • ${currentBoard.connections?.length || 0} connections`
        : "0 notes • 0 connections"}
    </div>
  </div>

  {/* MOBILE HEADER */}
  <div className="flex md:hidden items-center justify-between px-4 py-3">
    <button
      onClick={() => navigateBoard('prev')}
      disabled={currentBoardIndex === 0}
    >
      <ChevronLeft />
    </button>

    <BoardSelector
        boards={boards}
        currentBoardId={currentBoard?._id}
        boardChange={handleBoardChange}
        createBoard={handleCreateBoard}
        deleteBoard={handleDeleteBoard}
        renameBoard={handleRenameBoard}
      />

      <button
        className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
        onClick={() => navigateBoard('next')}
        disabled={currentBoardIndex === boards.length - 1}
      >
        <ChevronRight size={24} />
      </button>
<button
        className="px-4 py-2 bg-green-500 text-white rounded-full text-sm"
        onClick={() => {
          const newName = prompt('Enter new board name:', currentBoard.name);
          if (newName) handleRenameBoard(currentBoard.id, newName);
        }}
      >
        Rename Board
      </button>

    <button
      onClick={() => navigateBoard('next')}
      disabled={currentBoardIndex === boards.length - 1}
    >
      <ChevronRight />
    </button>
  </div>
</header>


      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-full h-[calc(100vh-120px)] md:h-[calc(100vh-140px)]">
          <BoardCanvas
            board={currentBoard}
            updateNote={handleUpdateNote}
            deleteNote={handleDeleteNote}
            createNote={createNote}
            createConnection={handleCreateConnection}
            deleteConnection={handleDeleteConnection}
          />
        </div>
      </main>
    </div>
  );
}

export default Final;