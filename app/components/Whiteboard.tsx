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

    // Get the device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    
    // Get the canvas size in CSS pixels
    const rect = canvas.getBoundingClientRect();
    
    // Set the canvas size in actual pixels
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    // Scale the context to account for the device pixel ratio
    ctx.scale(dpr, dpr);
    
    // Set white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);

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

    socket.emit('draw-start', {
      classCode,
      studentId,
      startX: x / rect.width,
      startY: y / rect.height,
      color: tool === 'erase' ? '#ffffff' : color,
      width: tool === 'erase' ? width * 2 : width
    });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing || isTeacher || !lastPoint) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (lastPoint) {
      socket.emit('draw-update', {
        classCode,
        studentId,
        startX: lastPoint.x / rect.width,
        startY: lastPoint.y / rect.height,
        endX: x / rect.width,
        endY: y / rect.height,
        color: tool === 'erase' ? '#ffffff' : color,
        width: tool === 'erase' ? width * 2 : width
      });

      drawOnCanvas({
        points: [
          { x: lastPoint.x / rect.width, y: lastPoint.y / rect.height },
          { x: x / rect.width, y: y / rect.height }
        ],
        color: tool === 'erase' ? '#ffffff' : color,
        width: tool === 'erase' ? width * 2 : width,
        type: tool
      });
    }

    setLastPoint({ x, y });
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
    setLastPoint(null);
    socket.emit('draw-end', { classCode, studentId });
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Send cleared canvas state
    socket.emit('clear-canvas', { classCode, studentId });
  };

  return (
    <div className="relative w-full aspect-[4/3] bg-white rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />
      {!isTeacher && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-white/90 p-2 rounded-lg shadow-lg">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer"
          />
          <input
            type="range"
            min="1"
            max="20"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="w-24"
          />
          <Button
            variant={tool === 'draw' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTool('draw')}
          >
            Draw
          </Button>
          <Button
            variant={tool === 'erase' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTool('erase')}
          >
            Erase
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={clearCanvas}
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
} 