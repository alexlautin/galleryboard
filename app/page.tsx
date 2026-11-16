'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowLeft, LogIn, Plus } from 'lucide-react';
import Whiteboard from './components/Whiteboard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Landing } from '@/components/landing';
import { TeacherDashboard, type Student } from '@/components/teacher-dashboard';
import { LogoMark } from '@/components/logo';
import { generateTwoWordName } from '@/lib/name-generator';
import * as data from '@/lib/data';
import { isDemoMode, takeDemoEnter } from '@/lib/demo';
import { DEMO_ROOM } from '@/lib/demo-data';

const Turnstile = dynamic(() =>
  import('next-turnstile').then(mod => mod.Turnstile), { ssr: false }
);

const sanitize = (input: string) => input.replace(/[^a-zA-Z0-9_-]/g, '');

export default function Home() {
  const [isTeacher, setIsTeacher] = useState(false);
  const [classCode, setClassCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [studentId, setStudentId] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [classroomId, setClassroomId] = useState<number | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [demo, setDemo] = useState(false);
  const [busy, setBusy] = useState(false);

  const [showRoomsOffNotice, setShowRoomsOffNotice] = useState(false);

  // Real rooms need Supabase and can be turned off for a portfolio deployment. When they're
  // off, Join and Create stay clickable but only explain that and point to the demo.
  const roomsOff = !demo && !data.roomsEnabled;
  const canUseRooms = demo || roomsOff || !!turnstileToken;
  const showRoomsOff = () => setShowRoomsOffNotice(true);

  useEffect(() => {
    if (!isDemoMode()) return;
    setDemo(true);
    // Coming from /demo: open the sample room as its teacher
    if (takeDemoEnter()) {
      setIsTeacher(true);
      setClassCode(DEMO_ROOM.class_code);
      setClassroomId(DEMO_ROOM.id);
    }
  }, []);

  // Each view starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [classCode, isTeacher]);

  const createClassroom = async () => {
    if (!demo && !turnstileToken) {
      setError("Please complete the bot check first.");
      return;
    }
    setError(null);
    setBusy(true);

    const newClassCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const { data: rows, error } = await data.createClassroom(newClassCode);
    setBusy(false);

    if (error) {
      setError(`Couldn't create a room: ${error.message}`);
      return;
    }
    if (!rows || rows.length === 0) {
      setError("Couldn't create a room: no data came back.");
      return;
    }

    setIsTeacher(true);
    setClassCode(newClassCode);
    setClassroomId(rows[0].id);
  };

  const joinClassroom = async () => {
    if (!inputCode) return;
    if (!demo && !turnstileToken) {
      setError("Please complete the bot check first.");
      return;
    }
    setError(null);
    setBusy(true);

    const newStudentId = Math.random().toString(36).substring(2, 10);
    const nameToUse = sanitize(displayName || generateTwoWordName());
    const sanitizedCode = sanitize(inputCode);
    const { data: classroomData, error: classroomError } = await data.findClassroomByCode(sanitizedCode);

    if (classroomError || !classroomData) {
      setBusy(false);
      setError(classroomError?.message ?? 'Room not found');
      return;
    }

    const { error } = await data.addStudent(classroomData.id, newStudentId, nameToUse);
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }

    setStudentId(newStudentId);
    setDisplayName(nameToUse);
    setClassroomId(classroomData.id);
    setClassCode(sanitizedCode);
  };

  useEffect(() => {
    if (!classroomId) return;

    const unsubscribe = data.subscribeToStudents(classroomId, {
      onInsert: (row) => {
        setStudents(prevStudents => [...prevStudents, row as unknown as Student]);
      },
      onDelete: (row) => {
        const deletedStudentId = row.student_id;
        setStudents(prevStudents =>
          prevStudents.filter(s => s.student_id !== deletedStudentId)
        );
      },
    });

    return unsubscribe;
  }, [classroomId]);

  // Demo only: switch from the teacher dashboard to drawing as a student in the same
  // room, and back. Your board then shows up in the teacher grid like any student's.
  const drawAsDemoStudent = async () => {
    if (!studentId) {
      const newStudentId = Math.random().toString(36).substring(2, 10);
      const { error } = await data.addStudent(classroomId!, newStudentId, 'You');
      if (error) {
        setError(error.message);
        return;
      }
      setStudentId(newStudentId);
      setDisplayName('You');
    }
    setSelectedStudent(null);
    setIsTeacher(false);
  };

  const removeStudent = async (id: string) => {
    setStudents((prevStudents) => prevStudents.filter((student) => student.student_id !== id));
    if (selectedStudent === id) setSelectedStudent(null);
    const { error } = await data.removeStudent(id, classroomId!);
    if (error) {
      setError(error.message);
    }
  };

  if (!classCode) {
    const rooms = (
      <div className="rounded-2xl border bg-card p-5 shadow-board sm:p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (roomsOff) showRoomsOff();
            else joinClassroom();
          }}
          className="space-y-3"
        >
          <label htmlFor="room-code" className="text-sm font-medium">
            Join with a room code
          </label>
          <div className="flex gap-2">
            <Input
              id="room-code"
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              placeholder={demo ? DEMO_ROOM.class_code : 'ABC123'}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              maxLength={12}
              className="h-11 flex-1 font-mono text-base uppercase tracking-[0.2em] placeholder:tracking-[0.2em]"
            />
            <Button type="submit" className="h-11 px-5" disabled={!canUseRooms || busy}>
              <LogIn className="mr-2 h-4 w-4" aria-hidden="true" />
              Join
            </Button>
          </div>
          {demo && (
            <p className="text-xs text-muted-foreground">
              The sample room is <span className="font-mono font-semibold text-foreground">{DEMO_ROOM.class_code}</span>.
            </p>
          )}
        </form>

        <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or
          <span className="h-px flex-1 bg-border" />
        </div>

        <Button
          onClick={roomsOff ? showRoomsOff : createClassroom}
          variant="outline"
          className="h-11 w-full"
          disabled={!canUseRooms || busy}
        >
          <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
          Create a room as a teacher
        </Button>

        {roomsOff && showRoomsOffNotice && (
          <p role="status" className="mt-4 rounded-lg bg-accent px-3 py-2.5 text-sm text-accent-foreground">
            Rooms are turned off in this portfolio version.{' '}
            <Link href="/demo" className="font-semibold underline underline-offset-2">
              Try the full app in demo mode.
            </Link>
          </p>
        )}
        {error && (
          <p role="alert" className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive">
            {error}
          </p>
        )}
        {demo ? (
          <p className="mt-4 text-xs text-muted-foreground">
            The bot check is skipped in the demo. Rooms and students here are simulated.
          </p>
        ) : !roomsOff ? (
          <div className="mt-4 flex justify-center">
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              theme="light"
              onVerify={(token) => setTurnstileToken(token)}
              className="max-w-full"
            />
          </div>
        ) : null}
      </div>
    );

    return <Landing demo={demo} rooms={rooms} />;
  }

  if (isTeacher) {
    return (
      <TeacherDashboard
        classCode={classCode}
        students={students}
        demo={demo}
        error={error}
        selectedStudent={selectedStudent}
        onSelect={setSelectedStudent}
        onRemove={removeStudent}
        onDrawAsStudent={drawAsDemoStudent}
      />
    );
  }

  return (
    <div className="bg-dots min-h-screen">
      <header className="border-b bg-background/90 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <LogoMark className="h-8 w-8 shrink-0" />
            <div className="min-w-0 leading-tight">
              <p className="truncate font-semibold">{displayName}</p>
              <p className="text-xs text-muted-foreground">
                Room <span className="font-mono font-semibold tracking-wider text-foreground">{classCode}</span>
                {' · '}only your teacher sees this board
              </p>
            </div>
          </div>
          {demo && classroomId && (
            <Button onClick={() => setIsTeacher(true)} variant="outline" size="sm">
              <ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden="true" />
              Teacher view
            </Button>
          )}
        </div>
      </header>
      <main className="px-3 py-3 sm:px-6 sm:py-6">
        <div className="mx-auto w-full max-w-[min(100%,calc((100dvh-14rem)*4/3))]">
          <Whiteboard studentId={studentId} classCode={classCode} />
          {demo && (
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Saving is simulated: your drawing stays in this tab, shows up in the teacher view, and is gone when you leave.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
