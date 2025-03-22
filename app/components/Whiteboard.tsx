'use client';

import { useEffect, useRef, useState } from 'react';
import type Pusher from 'pusher-js';
import { Button } from "@/components/ui/button";
import type { ClientToServerEvents, ServerToClientEvents, DrawData } from '@/types/socket';

interface WhiteboardProps {
  socket: Pusher;
  studentId: string;
  classCode: string;
  isTeacher?: boolean;
  onBoardClick?: () => void;
}

export default function Whiteboard({ socket, studentId, classCode, isTeacher = false, onBoardClick }: WhiteboardProps) {
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

    // Set up canvas
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Subscribe to draw updates
    const channel = socket.subscribe(`classroom-${classCode}`);
    
    channel.bind('draw-update', (data: { 
      studentId: string; 
      drawData: DrawData | null; 
      canvasState: string | null;
    }) => {
      console.log('Received draw update:', {
        studentId: data.studentId,
        isTeacher,
        currentStudentId: studentId,
        hasDrawData: !!data.drawData,
        hasCanvasState: !!data.canvasState
      });
      
      // Skip if it's our own drawing and we're not the teacher
      if (data.studentId === studentId && !isTeacher) {
        console.log('Skipping own drawing (not teacher)');
        return;
      }

      if (data.drawData) {
        console.log('Drawing with data:', data.drawData);
        drawOnCanvas(data.drawData);
      } else if (data.canvasState) {
        console.log('Loading canvas state');
        const img = new Image();
        img.onload = () => {
          console.log('Canvas state image loaded, drawing to canvas');
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        };
        img.onerror = (error) => {
          console.error('Error loading canvas state:', error);
        };
        img.src = data.canvasState;
      }
    });

    return () => {
      console.log('Cleaning up Pusher subscription');
      channel.unbind_all();
      socket.unsubscribe(`classroom-${classCode}`);
    };
  }, [socket, classCode, studentId, color, width, isTeacher]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isTeacher) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setLastPoint({ x, y });
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isTeacher) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx || !lastPoint) return;

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

    // Send draw update
    fetch('/api/pusher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'draw-update',
        classCode,
        studentId,
        drawData,
        canvasState: null // Don't send canvas state for intermediate updates
      })
    }).catch(console.error);

    setLastPoint({ x, y });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPoint(null);
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

    // Send draw update through Pusher API
    console.log('Sending draw update:', {
      studentId,
      classCode,
      hasDrawData: true,
      hasCanvasState: false
    });

    fetch('/api/pusher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'draw-update',
        classCode,
        studentId,
        drawData,
        canvasState: null // Don't send canvas state for intermediate updates
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Draw update response:', data);
    })
    .catch(error => {
      console.error('Error sending draw update:', error);
    });

    setLastPoint({ x, y });
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
    setLastPoint(null);

    // Send final canvas state when drawing ends
    const canvas = canvasRef.current;
    if (canvas && !isTeacher) {
      const canvasState = canvas.toDataURL('image/jpeg', 0.5); // Compress the image
      fetch('/api/pusher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'draw-update',
          classCode,
          studentId,
          drawData: null,
          canvasState
        })
      }).catch(console.error);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Send cleared canvas state
    const canvasState = canvas.toDataURL('image/jpeg', 0.5); // Compress the image
    fetch('/api/pusher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'draw-update',
        classCode,
        studentId,
        drawData: null,
        canvasState
      })
    }).catch(console.error);
  };

  const drawOnCanvas = (drawData: DrawData) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !drawData?.points?.length) return;

    console.log('Drawing points:', drawData.points);
    
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
    ctx.lineJoin = 'round';

    for (let i = 1; i < drawData.points.length; i++) {
      ctx.lineTo(drawData.points[i].x, drawData.points[i].y);
    }
    
    ctx.stroke();
    ctx.closePath();
    
    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
  };

  return (
    <div className="relative border border-input rounded-lg shadow-md" onClick={onBoardClick}>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className={`touch-none w-full h-full rounded-lg ${isTeacher ? 'cursor-default' : 'cursor-crosshair'} ${onBoardClick ? 'cursor-pointer' : ''}`}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onClick={onBoardClick}
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