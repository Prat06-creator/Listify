import { useState, useCallback } from 'react';

// interface Size {
//   width: number;
//   height: number;
// }

export const useResize = (
  initialSize,
  onResize,
  onResizeEnd
) => {
  const [isResizing, setIsResizing] = useState(false);
  const [size, setSize] = useState(initialSize);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isResizing) return;
    
    const deltaX = e.clientX - resizeStart.x;
    const deltaY = e.clientY - resizeStart.y;
    
    const newSize = {
      width: Math.max(100, size.width + deltaX),
      height: Math.max(80, size.height + deltaY),
    };
    
    setSize(newSize);
    setResizeStart({ x: e.clientX, y: e.clientY });
    onResize?.(newSize);
  }, [isResizing, resizeStart, size, onResize]);

  const handleMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false);
      onResizeEnd?.(size);
    }
  }, [isResizing, size, onResizeEnd]);

  return {
    size,
    isResizing,
    resizeHandlers: {
      onMouseDown: handleMouseDown,
    },
    mouseHandlers: {
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
    },
  };
};