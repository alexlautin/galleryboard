'use client';

import { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { Button } from "@/components/ui/button";
import type { ClientToServerEvents, ServerToClientEvents, DrawData } from '@/types/socket';

interface WhiteboardProps {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  studentId: string;
  classCode: string;
  isTeacher?: boolean;
  onBoardClick?: () => void;
}

export default function Whiteboard({ socket, studentId, classCode, isTeacher, onBoardClick }: WhiteboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [width, setWidth] = useState(2);
  const [tool, setTool] = useState<'draw' | 'erase'>('draw');
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Request initial canvas state if we're a teacher viewing a student's board
    if (isTeacher) {
      socket.emit('request-canvas-state', { classCode, studentId });
    }

    // Handle receiving draw updates
    socket.on('draw-update-received', ({ studentId: drawingStudentId, drawData, canvasState }) => {
      if (drawingStudentId === studentId) {
        if (canvasState) {
          loadCanvasState(canvasState);
        } else if (drawData) {
          drawOnCanvas(drawData);
        }
      }
    });

    // Handle receiving full canvas state
    socket.on('canvas-state-update', ({ studentId: updatedStudentId, canvasState }) => {
      if (updatedStudentId === studentId && canvasState) {
        loadCanvasState(canvasState);
      }
    });

    return () => {
      socket.off('draw-update-received');
      socket.off('canvas-state-update');
    };
  }, [socket, studentId, classCode, isTeacher]);

  const loadCanvasState = (canvasState: string) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = canvasState;
  };

  const drawOnCanvas = (drawData: DrawData) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !drawData?.points?.length) return;

    ctx.beginPath();
    ctx.moveTo(drawData.points[0].x, drawData.points[0].y);
    
    if (drawData.type === 'erase') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = drawData.color;
    }
    
    ctx.lineWidth = drawData.width;
    ctx.lineCap = 'round';

    for (let i = 1; i < drawData.points.length; i++) {
      ctx.lineTo(drawData.points[i].x, drawData.points[i].y);
    }
    
    ctx.stroke();
    ctx.closePath();
    
    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isTeacher) {
      if (onBoardClick) onBoardClick();
      return;
    }
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setLastPoint({ x, y });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing || isTeacher || !lastPoint) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const drawData: DrawData = {
      points: [lastPoint, { x, y }],
      color,
      width,
      type: tool
    };

    drawOnCanvas(drawData);

    // Get current canvas state
    const canvasState = canvas.toDataURL();
    
    // Emit both the draw data and canvas state
    socket.emit('draw-update', { 
      classCode, 
      studentId, 
      drawData,
      canvasState
    });

    setLastPoint({ x, y });
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
    setLastPoint(null);

    // Send final canvas state when drawing ends
    const canvas = canvasRef.current;
    if (canvas && !isTeacher) {
      const canvasState = canvas.toDataURL();
      socket.emit('draw-update', { 
        classCode, 
        studentId, 
        drawData: null,
        canvasState
      });
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Send cleared canvas state
    const canvasState = canvas.toDataURL();
    socket.emit('draw-update', { 
      classCode, 
      studentId, 
      drawData: null,
      canvasState
    });
  };

  return (
    <div className="relative border border-input rounded-lg shadow-md" onClick={onBoardClick}>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="touch-none w-full h-full rounded-lg"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />
      {!isTeacher && (
        <div className="absolute bottom-4 left-4 flex gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 rounded-lg shadow-md border border-input">
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer"
            />
            <Button
              onClick={() => setTool('draw')}
              variant={tool === 'draw' ? 'default' : 'secondary'}
              size="sm"
            >
              Draw
            </Button>
            <Button
              onClick={() => setTool('erase')}
              variant={tool === 'erase' ? 'default' : 'secondary'}
              size="sm"
            >
              Erase
            </Button>
            <Button
              onClick={clearCanvas}
              variant="destructive"
              size="sm"
            >
              Clear
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 