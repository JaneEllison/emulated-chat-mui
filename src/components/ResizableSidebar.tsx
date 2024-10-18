import React, { useState, useRef, ReactNode } from 'react';
import { Box } from '@mui/material';

type ResizableSidebarProps = {
  children: ReactNode;
};

const MAX_WIDTH = 500;
const MIN_WIDTH = 300;

const ResizableSidebar: React.FC<ResizableSidebarProps> = ({ children }) => {
  const [sidebarWidth, setSidebarWidth] = useState(400);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const resizerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    const resizedWidth = e.clientX;
    if (resizedWidth > MIN_WIDTH && resizedWidth < MAX_WIDTH) {
      setSidebarWidth(resizedWidth);
    }
  };

  const handleMouseDown = () => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.userSelect = 'none';
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.body.style.userSelect = 'auto';
  };

  return (
    <Box display="flex" height="100vh">
      <Box
        ref={sidebarRef}
        sx={{
          width: sidebarWidth,
          minWidth: MIN_WIDTH,
          maxWidth: MAX_WIDTH,
          backgroundColor: '#fff',
          overflowY: 'auto',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {children}
      </Box>
      <Box
        ref={resizerRef}
        onMouseDown={handleMouseDown}
        sx={{
          width: '5px',
          cursor: 'col-resize',
          backgroundColor: '#ccc',
          '&:hover': {
            backgroundColor: '#aaa',
          },
        }}
      />
    </Box>
  );
};

export default ResizableSidebar;
