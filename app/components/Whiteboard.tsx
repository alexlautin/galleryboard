'use client';

import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { supabase } from '@/lib/supabaseClient';

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
  const [tool, setTool] = useState<'draw' | 'erase'>('draw');
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);
  const [canvasState, setCanvasState] = useState<string | null>(null); // Manage canvas state
  const router = useRouter(); // Hook to handle page navigation

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
      supabase
        .from('drawing_updates')
        .select('*')
        .eq('classroom_id', classroomId)
        .eq('student_id', selectedStudentId)
        .order('updated_at', { ascending: false })
        .limit(1)
        .then(({ data }) => {
          if (data && data.length > 0) {
            const update = data[0];
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
    const filterField = classroomId ? `classroom_id=eq.${classroomId}` : `classroom_code=eq.${classCode}`;
    const channel = supabase.channel('drawing-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'drawing_updates',
          filter: filterField
        },
        (payload) => {
            console.log('Drawing update payload:', payload);
            const { student_id, draw_data, canvas_state } = payload.new;
            console.log("Filter check:", { isTeacher, selectedStudentId, student_id, studentId });
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
      )
      .subscribe();
    
    return () => {
      channel.unsubscribe();
    };
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
    
    if (drawData.type === 'erase') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = drawData.color;
    }
    
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    for (let i = 1; i < drawData.points.length; i++) {
      ctx.lineTo(drawData.points[i].x, drawData.points[i].y);
    }
    
    ctx.stroke();
    ctx.closePath();
    
    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
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

    setIsDrawing(true);
    setLastPoint(coords);
    setCurrentStroke({
      points: [coords],
      color: tool === 'erase' ? '#ffffff' : color,
      width: 2,
      type: tool
    });
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
    if (readOnly) return;
    setIsDrawing(false);
    setLastPoint(null);

    if (currentStroke) {
      drawBufferRef.current.push(currentStroke);
      setCurrentStroke(null);
    }

    const canvas = canvasRef.current;
    if (canvas) {
      const canvasState = canvas.toDataURL();
      const updateObj = {
        ...(classroomId ? { classroom_id: classroomId } : {}),
        classroom_code: classCode
      };
      supabase.from('drawing_updates').insert([
        { ...updateObj, student_id: studentId, draw_data: [], canvas_state: canvasState }
      ]).then(({ error }) => {
        if (error) {
          console.error('Error in handlePointerUp insert:', error);
        }
      });
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const canvasState = canvas.toDataURL();
    const updateObj = {
      ...(classroomId ? { classroom_id: classroomId } : {}),
      classroom_code: classCode
    };
    supabase.from('drawing_updates').insert([
      { ...updateObj, student_id: studentId, draw_data: [], canvas_state: canvasState }
    ]).then(({ error }) => {
      if (error) {
        console.error('Error in clearCanvas insert:', error);
      }
    });
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

      supabase.from('drawing_updates').insert([
        {
          ...updateObj,
          student_id: studentId,
          draw_data: combinedDrawData,
          canvas_state: canvasState
        }
      ]).then(({ error }) => {
        if (error) {
          console.error('Error flushing draw buffer:', error);
        }
      });
    }, 100); // flush every 500ms

    return () => clearInterval(interval);
  }, [classroomId, classCode, studentId]);

  // Navigate back to the homepage
  const handleBackClick = () => {
    router.push('/'); // Or use window.location.href = '/' for regular navigation
  };

  // Cleanup: clear the student's drawing updates when the whiteboard unmounts
  useEffect(() => {
    return () => {
      // Determine the filter field: use classroom_id if available, otherwise classroom_code
      const filterField = classroomId ? 'classroom_id' : 'classroom_code';
      const filterValue = classroomId ? classroomId : classCode;
      
      supabase
        .from('drawing_updates')
        .delete()
        .eq('student_id', studentId)
        .eq(filterField, filterValue)
        .then(({ error }) => {
          if (error) {
            console.error('Error clearing drawings on exit:', error);
          } else {
            console.log('Successfully cleared drawing updates on exit.');
          }
        });
    };
  }, [studentId, classroomId, classCode]);
  
  // Additional cleanup: delete drawing_updates when the page is closed using the beforeunload event
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const filterField = classroomId ? `classroom_id=eq.${classroomId}` : `classroom_code=eq.${classCode}`;
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/drawing_updates?student_id=eq.${studentId}&${filterField}`;
  
      // Use fetch with keepalive so the request is sent during page unload
      fetch(url, {
        method: 'DELETE',
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        },
        keepalive: true,
      });
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [studentId, classroomId, classCode]);
  
  return (
    <div className="relative border border-input rounded-lg shadow-md" onClick={onBoardClick}>
      <canvas
        ref={canvasRef}
        className="touch-none w-full h-full rounded-lg"
        style={{ aspectRatio: '4/3' }}
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
                    <path d="M3 20h18" />
                    <path d="M15 5l5 5" />
                    <path d="M20 5l-5 5" />
                  </svg>
                  <span className="sr-only">Erase</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Erase</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={clearCanvas}
                  variant="outline"
                  size="icon"
                  className="w-8 h-8"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M4 12h16" />
                    <path d="M12 4v16" />
                  </svg>
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
});

export default Whiteboard;