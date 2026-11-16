'use client';

import { useEffect, useState } from 'react';
import * as data from '@/lib/data';

// Latest snapshot of one student's board, for the teacher grid. Refreshes on
// every new drawing update and, as a fallback, every 5 seconds.
export function BoardPreview({ studentId, classCode }: { studentId: string; classCode: string }) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const fetchPreview = async () => {
      const { data: rows, error } = await data.fetchLatestCanvasState(studentId, classCode);
      if (!active) return;
      if (error) {
        console.error('Error fetching drawing preview for', studentId, error);
        return;
      }
      const canvasState = rows?.[0]?.canvas_state ?? null;
      setPreview(typeof canvasState === 'string' && canvasState ? canvasState : null);
    };

    fetchPreview();
    const interval = setInterval(fetchPreview, 5000);
    const unsubscribe = data.subscribeToStudentDrawing(studentId, classCode, () => fetchPreview());

    return () => {
      active = false;
      clearInterval(interval);
      unsubscribe();
    };
  }, [studentId, classCode]);

  return (
    <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-white">
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview.startsWith('data:image') ? preview : `data:image/png;base64,${preview}`}
          alt=""
          className="h-full w-full object-contain"
          draggable={false}
        />
      ) : (
        <span className="text-xs text-muted-foreground">No strokes yet</span>
      )}
    </div>
  );
}
