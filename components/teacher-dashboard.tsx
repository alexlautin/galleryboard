'use client';

import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, PenLine, Users, X } from 'lucide-react';
import Whiteboard from '@/app/components/Whiteboard';
import { Button } from '@/components/ui/button';
import { BoardPreview } from '@/components/board-preview';
import { RoomCode } from '@/components/room-code';
import { LogoMark } from '@/components/logo';

export type Student = { student_id: string; displayName: string };

type Props = {
  classCode: string;
  students: Student[];
  demo: boolean;
  error: string | null;
  selectedStudent: string | null;
  onSelect: (studentId: string | null) => void;
  onRemove: (studentId: string) => void;
  onDrawAsStudent: () => void;
};

export function TeacherDashboard({
  classCode,
  students,
  demo,
  error,
  selectedStudent,
  onSelect,
  onRemove,
  onDrawAsStudent,
}: Props) {
  const count = students.length;

  return (
    <div className="bg-dots min-h-screen">
      <header className="border-b bg-background/90 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <LogoMark className="hidden h-9 w-9 sm:block" />
            <div>
              <p className="text-xs font-medium text-muted-foreground">Room code</p>
              <RoomCode code={classCode} className="mt-1" />
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground">
              <Users className="h-4 w-4" aria-hidden="true" />
              {count} {count === 1 ? 'student' : 'students'}
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-600" aria-hidden="true" />
            </span>
            {demo && (
              <Button onClick={onDrawAsStudent} className="rounded-lg">
                <PenLine className="mr-2 h-4 w-4" aria-hidden="true" />
                Draw as a student
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="px-4 py-6 sm:px-6 sm:py-8">
        {demo && (
          <p className="mb-5 max-w-3xl text-sm text-muted-foreground">
            You&apos;re the teacher of a sample room. The students and their drawings are simulated, and two of
            them are still drawing. Open any board to see it full screen, or draw as a student to add your own.
          </p>
        )}
        {error && (
          <p role="alert" className="mb-5 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        {count === 0 ? (
          <div className="mx-auto mt-10 max-w-md rounded-2xl border border-dashed bg-card/80 p-8 text-center">
            <p className="font-display text-xl font-semibold">Waiting for students</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Share the code <span className="font-mono font-semibold text-foreground">{classCode}</span>. Boards
              appear here as soon as students join.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {students.map(student => (
              <li key={student.student_id} className="group relative">
                <button
                  type="button"
                  onClick={() => onSelect(student.student_id)}
                  className="block w-full overflow-hidden rounded-xl border bg-card text-left shadow-board transition hover:-translate-y-0.5 hover:border-brand-ink/40 hover:shadow-float focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={`Open ${student.displayName}'s board`}
                >
                  <BoardPreview studentId={student.student_id} classCode={classCode} />
                  <span className="flex items-center justify-between gap-2 border-t px-3 py-2.5">
                    <span className="truncate text-sm font-medium">{student.displayName}</span>
                    <Maximize2 className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-60 transition group-hover:opacity-100" aria-hidden="true" />
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(student.student_id)}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border bg-card/95 text-muted-foreground shadow-sm transition hover:border-destructive/40 hover:text-destructive focus-visible:opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100"
                  aria-label={`Remove ${student.displayName}`}
                  title="Remove student"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>

      {selectedStudent && (
        <BoardViewer
          classCode={classCode}
          students={students}
          studentId={selectedStudent}
          onSelect={onSelect}
        />
      )}
    </div>
  );
}

// Full-screen, read-only view of one board, with arrows to step through the class
function BoardViewer({
  classCode,
  students,
  studentId,
  onSelect,
}: {
  classCode: string;
  students: Student[];
  studentId: string;
  onSelect: (studentId: string | null) => void;
}) {
  const index = students.findIndex(s => s.student_id === studentId);
  const name = students[index]?.displayName ?? studentId;
  const step = (delta: number) => {
    if (students.length < 2 || index < 0) return;
    onSelect(students[(index + delta + students.length) % students.length].student_id);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onSelect(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  });

  return (
    <div role="dialog" aria-modal="true" aria-label={`${name}'s board`} className="bg-dots fixed inset-0 z-50 flex flex-col bg-background">
      <div className="flex items-center justify-between gap-3 border-b bg-background/95 px-4 py-3 sm:px-6">
        <Button variant="ghost" size="sm" onClick={() => onSelect(null)} className="-ml-2">
          <X className="mr-1.5 h-4 w-4" aria-hidden="true" />
          Close
        </Button>
        <div className="min-w-0 text-center">
          <p className="truncate font-semibold">{name}</p>
          <p className="text-xs text-muted-foreground">
            {index + 1} of {students.length} · Room {classCode}
          </p>
        </div>
        <div className="flex gap-1">
          <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => step(-1)} aria-label="Previous board" disabled={students.length < 2}>
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => step(1)} aria-label="Next board" disabled={students.length < 2}>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center overflow-auto p-4 sm:p-8">
        <div className="w-full max-w-[min(100%,calc((100dvh-9rem)*4/3))]">
          <Whiteboard key={studentId} studentId={studentId} classCode={classCode} readOnly />
        </div>
      </div>
    </div>
  );
}
