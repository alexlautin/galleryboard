'use client';

import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Eraser, Pencil, Trash2, Undo2 } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import * as data from '@/lib/data';
import { cn } from '@/lib/utils';

const COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'Red', value: '#dc2626' },
  { name: 'Orange', value: '#f59e0b' },
  { name: 'Green', value: '#15803d' },
  { name: 'Blue', value: '#1d4ed8' },
  { name: 'Purple', value: '#7c3aed' },
];

const SIZES = [
  { name: 'Fine pen', value: 3, dot: 4 },
  { name: 'Medium pen', value: 6, dot: 7 },
  { name: 'Thick pen', value: 14, dot: 11 },
];

const MAX_UNDO = 25;

type DrawData = {
  points: { x: number; y: number }[];
  color: string;
  width: number;
  type: 'draw' | 'erase';
};

interface WhiteboardProps {
  studentId: string;
  classCode: string;
  classroomId?: number; // New prop for numeric classroom id
  isTeacher?: boolean;
  selectedStudentId?: string; // For teacher view, the id of the student whose board is shown
  onBoardClick?: () => void;
  readOnly?: boolean;
}

const Whiteboard = forwardRef<HTMLCanvasElement, WhiteboardProps>(({
  studentId,
  classCode,
  classroomId,
  isTeacher,
  onBoardClick,
  selectedStudentId,
  readOnly
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastSentRef = useRef<number>(Date.now());
  const drawBufferRef = useRef<DrawData[]>([]);
  const [currentStroke, setCurrentStroke] = useState<DrawData | null>(null); // New state for current stroke

  // Expose the canvas element to parent refs
  useImperativeHandle(ref, () => canvasRef.current as HTMLCanvasElement);

  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState(SIZES[1].value);
  const [tool, setTool] = useState<'draw' | 'erase'>('draw');
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);
  // Snapshots of the canvas taken before each stroke or clear, for Undo
  const undoStackRef = useRef<ImageData[]>([]);
  const [canUndo, setCanUndo] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set fixed dimensions
    const width = 800;
    const height = 600;
    
    // Set the canvas size in actual pixels
    canvas.width = width;
    canvas.height = height;
    
    // Set white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Request initial canvas state if we're a teacher viewing a student's board
    if (isTeacher && selectedStudentId && classroomId) {
      data.fetchLatestDrawingUpdate(classroomId, selectedStudentId)
        .then(({ data: rows }) => {
          if (rows && rows.length > 0) {
            const update = rows[0];
            if (update.canvas_state) {
              loadCanvasState(update.canvas_state);
            } else if (update.draw_data) {
              drawOnCanvas(update.draw_data);
            }
          }
        });
    }
  }, [classCode, isTeacher, selectedStudentId, classroomId]);

  useEffect(() => {
    const unsubscribe = data.subscribeToRoomDrawings(
        { classroomId, classCode },
        (row, payload) => {
            const { student_id, draw_data, canvas_state } = row;
          if (isTeacher) {
            if (!selectedStudentId || selectedStudentId === student_id) {
              if (canvas_state) {
                loadCanvasState(canvas_state);
              } else if (draw_data) {
                drawOnCanvas(draw_data);
              }
            }
          } else {
            if (student_id === studentId) {
              if (canvas_state) {
                loadCanvasState(canvas_state);
              } else if (draw_data) {
                drawOnCanvas(draw_data);
              }
            }
          }
        }
      );

    return unsubscribe;
  }, [classroomId, classCode, studentId, isTeacher, selectedStudentId]);

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
    
    // The board has a white background, so erasing paints white. That keeps
    // saved snapshots and the teacher's previews free of transparent holes.
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = drawData.type === 'erase' ? '#ffffff' : drawData.color;
    ctx.lineWidth = drawData.width || 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = 1; i < drawData.points.length; i++) {
      ctx.lineTo(drawData.points[i].x, drawData.points[i].y);
    }
    
    ctx.stroke();
    ctx.closePath();
    
  };

  const pushUndo = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    undoStackRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    if (undoStackRef.current.length > MAX_UNDO) undoStackRef.current.shift();
    setCanUndo(true);
  };

  const saveSnapshot = (reason: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updateObj = {
      ...(classroomId ? { classroom_id: classroomId } : {}),
      classroom_code: classCode
    };
    data.insertDrawingUpdate(
      { ...updateObj, student_id: studentId, draw_data: [], canvas_state: canvas.toDataURL() }
    ).then(({ error }) => {
      if (error) {
        console.error(`Error in ${reason} insert:`, error);
      }
    });
  };

  const undo = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const snapshot = undoStackRef.current.pop();
    setCanUndo(undoStackRef.current.length > 0);
    if (!canvas || !ctx || !snapshot) return;
    ctx.putImageData(snapshot, 0, 0);
    saveSnapshot('undo');
  };

  const getCanvasCoordinates = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (readOnly) {
      if (onBoardClick) onBoardClick();
      return;
    }
    
    const coords = getCanvasCoordinates(e);
    if (!coords) return;

    // Keep getting moves when a finger or pen slides past the edge of the board
    try {
      (e.target as Element).setPointerCapture(e.pointerId);
    } catch {}

    pushUndo();
    const stroke: DrawData = {
      points: [coords],
      color: tool === 'erase' ? '#ffffff' : color,
      width: tool === 'erase' ? size * 3 : size,
      type: tool
    };
    // A tap leaves a dot
    drawOnCanvas({ ...stroke, points: [coords, coords] });
    setIsDrawing(true);
    setLastPoint(coords);
    setCurrentStroke(stroke);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing || readOnly || !lastPoint || !currentStroke) return;

    const coords = getCanvasCoordinates(e);
    if (!coords) return;

    const newStroke = {
      ...currentStroke,
      points: [...currentStroke.points, coords]
    };

    setCurrentStroke(newStroke);
    drawOnCanvas({ ...newStroke, points: [lastPoint, coords] });
    setLastPoint(coords);
  };

  const handlePointerUp = () => {
    if (readOnly || !isDrawing) return;
    setIsDrawing(false);
    setLastPoint(null);

    if (currentStroke) {
      drawBufferRef.current.push(currentStroke);
      setCurrentStroke(null);
    }

    saveSnapshot('handlePointerUp');
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    pushUndo();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveSnapshot('clearCanvas');
  };

  // Flush buffered strokes to Supabase every 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      const canvas = canvasRef.current;
      if (!canvas || drawBufferRef.current.length === 0) return;

      const canvasState = canvas.toDataURL();
      const updateObj = {
        ...(classroomId ? { classroom_id: classroomId } : {}),
        classroom_code: classCode
      };

      const combinedDrawData = drawBufferRef.current;
      drawBufferRef.current = [];

      data.insertDrawingUpdate({
        ...updateObj,
        student_id: studentId,
        draw_data: combinedDrawData,
        canvas_state: canvasState
      }).then(({ error }) => {
        if (error) {
          console.error('Error flushing draw buffer:', error);
        }
      });
    }, 100); // flush every 100ms

    return () => clearInterval(interval);
  }, [classroomId, classCode, studentId]);

  const pickColor = (c: string) => {
    setColor(c);
    setTool('draw');
  };

  if (readOnly || isTeacher) {
    return (
      <div className="overflow-hidden rounded-xl border bg-white shadow-board" onClick={onBoardClick}>
        <canvas
          ref={canvasRef}
          className="block h-auto w-full touch-none"
          style={{ aspectRatio: '4/3' }}
          onPointerDown={handlePointerDown}
        />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-board">
      <div
        role="toolbar"
        aria-label="Drawing tools"
        className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b px-2.5 py-2 sm:px-3"
      >
        <div className="flex items-center gap-1" role="radiogroup" aria-label="Color">
          {COLORS.map(c => (
            <button
              key={c.value}
              type="button"
              role="radio"
              aria-checked={tool === 'draw' && color === c.value}
              aria-label={c.name}
              title={c.name}
              onClick={() => pickColor(c.value)}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full transition sm:h-9 sm:w-9',
                tool === 'draw' && color === c.value ? 'bg-muted ring-2 ring-foreground/80' : 'hover:bg-muted'
              )}
            >
              <span className="h-5 w-5 rounded-full border border-black/10" style={{ backgroundColor: c.value }} />
            </button>
          ))}
          <label
            title="Custom color"
            className={cn(
              'relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-muted sm:h-9 sm:w-9',
              tool === 'draw' && !COLORS.some(c => c.value === color) && 'bg-muted ring-2 ring-foreground/80'
            )}
          >
            <span
              className="h-5 w-5 rounded-full border border-black/10"
              style={{ background: 'conic-gradient(#ef4444, #f59e0b, #22c55e, #3b82f6, #a855f7, #ef4444)' }}
            />
            <span className="sr-only">Custom color</span>
            <input
              type="color"
              value={color}
              onChange={e => pickColor(e.target.value)}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </label>
        </div>

        <Separator orientation="vertical" className="hidden h-6 sm:block" />

        <div className="flex items-center gap-1" role="radiogroup" aria-label="Pen size">
          {SIZES.map(s => (
            <button
              key={s.value}
              type="button"
              role="radio"
              aria-checked={size === s.value}
              aria-label={s.name}
              title={s.name}
              onClick={() => setSize(s.value)}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-lg transition sm:h-9 sm:w-9',
                size === s.value ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-muted'
              )}
            >
              <span className="rounded-full bg-current" style={{ width: s.dot, height: s.dot }} />
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1">
          <ToolButton label="Pen" active={tool === 'draw'} onClick={() => setTool('draw')}>
            <Pencil className="h-4 w-4" />
          </ToolButton>
          <ToolButton label="Eraser" active={tool === 'erase'} onClick={() => setTool('erase')}>
            <Eraser className="h-4 w-4" />
          </ToolButton>
          <ToolButton label="Undo" onClick={undo} disabled={!canUndo}>
            <Undo2 className="h-4 w-4" />
          </ToolButton>
          <ToolButton label="Clear board" onClick={clearCanvas}>
            <Trash2 className="h-4 w-4" />
          </ToolButton>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className={cn('block h-auto w-full touch-none bg-white', tool === 'erase' ? 'cursor-cell' : 'cursor-crosshair')}
        style={{ aspectRatio: '4/3' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />
    </div>
  );
});

function ToolButton({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={active}
      title={label}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-lg transition disabled:pointer-events-none disabled:opacity-35',
        active ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:bg-muted'
      )}
    >
      {children}
    </button>
  );
}

Whiteboard.displayName = 'Whiteboard';

export default Whiteboard;