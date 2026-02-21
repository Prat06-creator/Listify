import React, { useState, useRef } from 'react';
import { Plus } from 'lucide-react';
import { Board, StickyNote, Connection } from './constants/index';
import { StickyNote as StickyNoteComponent } from './stickyNote';
import { ConnectionLine } from './connectionLine';
import { getRandomColor } from './constants/color';
import {useStickyStore} from "../../store/stickyStore.js"
// interface BoardCanvasProps {
//   board: Board;
//   onUpdateNote: (noteId: string, updates: Partial<StickyNote>) => void;
//   onDeleteNote: (noteId: string) => void;
//   onCreateNote: (x: number, y: number) => void;
//   onCreateConnection: (fromNoteId: string, toNoteId: string) => void;
//   onDeleteConnection: (connectionId: string) => void;
// }

export const BoardCanvas = ( 
  ) => {
    const {deleteNote,updateNote,createNote,boards,renameBoard,deleteBoard,createBoard,boardChange,currentBoardId,setCurrentBoardId,createConnection,deleteConnection }= useStickyStore()
      const [connectionMode, setConnectionMode] = useState(null);
  const canvasRef = useRef(null);
const currentBoard = boards.find((b) => b._id === currentBoardId);
  const handleStartConnection = (noteId) => {
    if (connectionMode === noteId) {
      setConnectionMode(null);
    } else if (connectionMode) {
      createConnection(currentBoard._id,connectionMode, noteId);
      setConnectionMode(null);
    } else {
      setConnectionMode(noteId);
    }
  };

  const handleCanvasClick = (e) => {
    if (connectionMode) {
      setConnectionMode(null);
      return;
    }
    // Only allow connection mode cancellation, no note creation on canvas click
  };

  const getSvgDimensions = () => {
    if (!canvasRef.current) return { width: 1200, height: 800 };
    
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      width: Math.max(1200, rect.width),
      height: Math.max(800, rect.height),
    };
  };

  const svgDimensions = getSvgDimensions();
  if (!currentBoard) {
    return (
      <div className="flex items-center justify-center w-full h-full text-gray-500">
        Please select a board to start working.
      </div>
    );
  }
  return (
    <div
      ref={canvasRef}
      className="relative w-full h-full bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border-2 border-orange-200 shadow-inner overflow-hidden"
      onClick={handleCanvasClick}
    >
      {/* Connection lines SVG overlay */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={svgDimensions.width}
        height={svgDimensions.height}
        style={{ pointerEvents: 'none' }}
      >
        <g style={{ pointerEvents: 'auto' }}>
          {(currentBoard.connections??[]).map((connection) => {
            const fromNote = currentBoard.notes.find(n => n._id === connection.fromNoteId);
            const toNote = currentBoard.notes.find(n => n._id === connection.toNoteId);
            
            return (
              <ConnectionLine
                key={connection._id}
              
              
                fromNote={fromNote}
                toNote={toNote}
                 connection={connection}
                onDelete={() => deleteConnection(currentBoard._id,connection._id)}
              />
            );
          })}
        </g>
      </svg>

      {/* Sticky notes */}
      {(currentBoard.notes??[]).map((note) => (
        <StickyNoteComponent
          key= {note._id}
          note={note}
          canvasRef={canvasRef}
          onUpdate={(data) => updateNote(currentBoard._id, note._id, data)}
          onDelete={() => deleteNote(currentBoard._id,note._id)}
          onStartConnection={handleStartConnection}
          isConnectionMode={!!connectionMode}
          isConnectionSource={connectionMode === note._id}
        />
      ))}

      {/* Add note button */}
      <button
        className="fixed bottom-20 md:bottom-8 right-4 md:right-8 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group hover:scale-110"
        onClick={(e) => {
          e.stopPropagation();
          // createNote(
            // Math.random() * 400 + 100,
            // Math.random() * 300 + 100
          // );
          const randomX = Math.floor(Math.random() * 400 + 100);
        const randomY = Math.floor(Math.random() * 300 + 100);

        createNote(currentBoard._id, {
            x: randomX,
            y: randomY,
            color: "#fef3c7",
            text: "",
            width: 200,
            height: 150,
            zIndex: 1,
        });
    
        }}
        title="Add new note"
      >
        <Plus size={24} className="group-hover:rotate-90 transition-transform duration-200" />
      </button>

      {/* Connection mode indicator */}
      {connectionMode && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg z-50">
          <div className="text-sm font-medium">Connection Mode</div>
          <div className="text-xs opacity-90">Click another note to connect, or click the same note to cancel</div>
        </div>
      )}
    </div>
  );
};