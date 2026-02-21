import { useState, useCallback } from 'react';
import { Position } from './index';

export const useDrag = (
  initialPosition,
  onDrag,
  onDragEnd
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState(initialPosition);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  }, [position]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const newPosition = {
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    };
    
    setPosition(newPosition);
    onDrag?.(newPosition);
  }, [isDragging, dragStart, onDrag]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      onDragEnd?.(position);
    }
  }, [isDragging, position, onDragEnd]);

  return {
    position,
    isDragging,
    dragHandlers: {
      onMouseDown: handleMouseDown,
    },
    mouseHandlers: {
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
    },
  };
};