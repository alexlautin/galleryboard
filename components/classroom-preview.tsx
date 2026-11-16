'use client';

import { useEffect, useMemo, useState } from 'react';
import { SAMPLE_STUDENTS, WIDTH, HEIGHT, DEMO_ROOM, type Stroke } from '@/lib/demo-data';
import { cn } from '@/lib/utils';

const toPoints = (s: Stroke) => s.points.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

// One sample board, drawn stroke by stroke with an SVG draw-on animation
function SketchBoard({ strokes, delay, duration }: { strokes: Stroke[]; delay: number; duration: number }) {
  const per = duration / strokes.length;
  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-full w-full" aria-hidden="true">
      {strokes.map((s, i) => (
        <polyline
          key={i}
          points={toPoints(s)}
          pathLength={1}
          fill="none"
          stroke={s.color}
          strokeWidth={s.width * 1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="draw-stroke"
          style={{ ['--draw-delay' as string]: `${delay + i * per}ms`, ['--draw-duration' as string]: `${per * 1.15}ms` }}
        />
      ))}
    </svg>
  );
}

// The landing page's picture of the teacher view: the demo's sample students
// drawing their boards, replayed on a loop. Built from the same data as /demo.
export function ClassroomPreview({ className }: { className?: string }) {
  const boards = useMemo(() => SAMPLE_STUDENTS.slice(0, 6).map(s => ({ ...s, strokes: s.strokes() })), []);
  const [round, setRound] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setRound(r => r + 1), 11000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={cn('rounded-2xl border bg-card p-3 shadow-float sm:p-4', className)}>
      <div className="flex items-center justify-between gap-3 px-1 pb-3 sm:pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Room</span>
          <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs font-semibold tracking-widest">
            {DEMO_ROOM.class_code}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">{SAMPLE_STUDENTS.length} students</span>
      </div>
      <div key={round} className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
        {boards.map((b, i) => (
          <figure key={b.name} className="overflow-hidden rounded-lg border bg-muted/40">
            <div className="aspect-[4/3] bg-white">
              <SketchBoard strokes={b.strokes} delay={i * 450} duration={b.live ? 4200 : 2200} />
            </div>
            <figcaption className="flex items-center justify-between gap-2 border-t px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground sm:text-xs">
              <span className="truncate">{b.name}</span>
              {b.live && <span className="shrink-0 italic text-brand-ink">drawing…</span>}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
