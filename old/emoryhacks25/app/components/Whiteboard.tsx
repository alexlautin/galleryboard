'use client';

import { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { DrawData } from '@/types/socket';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface WhiteboardProps {
  socket: Socket;
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

    // Handle loading saved canvas state
    socket.on('load-canvas', ({ studentId: loadStudentId, canvasData }) => {
      if (loadStudentId === studentId && canvasData) {
        loadCanvasState(canvasData);
      }
    });

    return () => {
      socket.off('draw-update-received');
      socket.off('canvas-state-update');
      socket.off('load-canvas');
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
    if (isTeacher) return;
    
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8 rounded-md"
                      style={{ backgroundColor: color }}
                    >
                      <span className="sr-only">Pick color</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-32 h-8"
                    />
                  </PopoverContent>
                </Popover>
              </TooltipTrigger>
              <TooltipContent>
                <p>Pick color</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Separator orientation="vertical" className="mx-1" />
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setTool('draw')}
                  variant={tool === 'draw' ? 'default' : 'secondary'}
                  size="sm"
                  className="px-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M12 19l7-7 3 3-7 7-3-3z" />
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                    <path d="M2 2l7.586 7.586" />
                    <path d="M11 11l-4 4" />
                  </svg>
                  <span className="sr-only">Draw</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Draw</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setTool('erase')}
                  variant={tool === 'erase' ? 'default' : 'secondary'}
                  size="sm"
                  className="px-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M20 20H7L3 16C2.5 15.5 2.5 14.5 3 14L13 4L20 11L11 20" />
                    <path d="M6 11L13 18" />
                  </svg>
                  <span className="sr-only">Erase</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Erase</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Separator orientation="vertical" className="mx-1" />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={clearCanvas}
                  variant="destructive"
                  size="sm"
                  className="px-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                  <span className="sr-only">Clear canvas</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear canvas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
} 