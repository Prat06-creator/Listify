import { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import BoardWorkspace from './boardWorkspace';
import HomeScreen from './home';
import { useWishBoardStore } from '../../store/wishBoardStore';

export default function Wishboard() {
  const { boards, getBoards, createsBoard, setCurrentBoardId, currentBoardId, updatesBoard,deletesBoard } =useWishBoardStore();
  const [currentView, setCurrentView] = useState('home');
  const [editingBoard, setEditingBoard] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    getBoards();
  }, []);
  const handleCreateBoard = async (type, period) => {
    await createsBoard({type, period});
    setCurrentView('home');
  }
  const handleSelectBoard = (boardId) => {
    setCurrentBoardId(boardId);
    setCurrentView('board');
  }

  const selectedBoard = boards.find(b => b._id === currentBoardId);
  
const renameBoard = (boardId, newName) => {
  updatesBoard(boardId, { name: newName });
};
const handleRename = (boardId) => {
  const board = boards.find(b => b._id === boardId);
  if (board) {
    setEditingBoard(boardId);
    setEditName(board.name);
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

  const updateBoard = (boardId, updates) => {
    updatesBoard(boardId, updates);
  };

  const handleGoHome = () => {
    setCurrentView('home');
    setCurrentBoardId(null);
  };
  const deleteBoard=(boardId)=>{
    deletesBoard(boardId);
    setCurrentView('home');
    setCurrentBoardId(null);
  }
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        boards={boards}
        onSelectBoard={(id)=>handleSelectBoard(id)}
        onCreateBoard={(type, period) => handleCreateBoard(type, period)}
        onGoHome={handleGoHome}
        onDeleteBoard={deleteBoard}
        onRenameBoard={handleRename}
      />

      {currentView === 'home' ? (
        <HomeScreen boards={boards} onSelectBoard={(id)=>handleSelectBoard(id)} />
      ) : selectedBoard ? (
        <BoardWorkspace
          board={selectedBoard}
          onUpdate={(updates) => updatesBoard(selectedBoard._id, updates)}
          onBack={handleGoHome}
        />
      ) : null}
      {editingBoard && (
  <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[9999]">
    <div className="bg-white p-6 rounded-xl shadow-xl w-80">
      <h3 className="font-semibold mb-3">Rename Board</h3>

      <input
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
        className="w-full p-2 border rounded-lg"
      />

      <div className="flex justify-end gap-2 mt-4">
        <button onClick={cancelRename} className="px-3 py-1 bg-gray-200 rounded-lg">Cancel</button>
        <button onClick={confirmRename} className="px-3 py-1 bg-pink-500 text-white rounded-lg">Save</button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}


