import React from 'react';
import { X } from 'lucide-react';
import { StickyNote, Connection } from './constants/index';
import {useStickyStore} from "../../store/stickyStore.js"
// interface ConnectionLineProps {
//   connection: Connection;
//   fromNote: StickyNote | undefined;
//   toNote: StickyNote | undefined;
//   onDelete: (connectionId: string) => void;
// }

export const ConnectionLine= ({ boardId, fromNote, toNote,connection
}) => {
  const {deleteConnection,currentBoardId,boards }= useStickyStore()
     
  if (!fromNote || !toNote) return null;

  const fromX = fromNote.x + fromNote.width / 2;
  const fromY = fromNote.y + fromNote.height / 2;
  const toX = toNote.x + toNote.width / 2;
  const toY = toNote.y + toNote.height / 2;

  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2;
console.log(currentBoardId)
  return (
    <g>
      <line
        x1={fromX}
        y1={fromY}
        x2={toX}
        y2={toY}
        stroke="#ef4444"
        strokeWidth="2"
        strokeDasharray="5,5"
        className="animate-pulse"
      />
      <circle
        cx={midX}
        cy={midY}
        r="12"
        fill="white"
        stroke="#ef4444"
        strokeWidth="2"
        className="cursor-pointer hover:fill-red-50"
        onClick={() => {
  if (!connection?._id) return;
  deleteConnection(currentBoardId, connection._id);
}}
       
      />
      <foreignObject x={midX - 6} y={midY - 6} width="12" height="12">
        <X size={12} className="text-red-500" />
      </foreignObject>
    </g>
  );
};