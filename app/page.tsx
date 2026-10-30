'use client';

import { useEffect, useState } from 'react';
import Whiteboard from './components/Whiteboard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { generateTwoWordName } from '@/lib/name-generator';
import * as data from '@/lib/data';
import { isDemoMode, takeDemoEnter } from '@/lib/demo';
import { DEMO_ROOM } from '@/lib/demo-data';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import React from "react";

const Turnstile = dynamic(() =>
  import('next-turnstile').then(mod => mod.Turnstile), { ssr: false }
);

const sanitize = (input: string) => input.replace(/[^a-zA-Z0-9_-]/g, '');

type Student = {
  student_id: string;
  displayName: string;
};

interface DrawingPreviewProps {
  studentId: string;
  classCode: string;
}

const DrawingPreview = ({ studentId, classCode }: DrawingPreviewProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreview = async () => {
      const { data: rows, error } = await data.fetchLatestCanvasState(studentId, classCode);

      console.log('🎯 Supabase response:', { data: rows, error });

      if (error) {
        console.error('Error fetching drawing preview for', studentId, error);
      } else {
        const canvasState: string | null = rows?.[0]?.canvas_state ?? null;
        console.log("🖼 Raw canvas_state from Supabase:", canvasState);
        if (canvasState && typeof canvasState === 'string') {
          setPreview(canvasState);
        } else {
          console.warn("⚠️ canvas_state is not a string or is null:", canvasState);
          setPreview(null);
        }
      }
    };

    fetchPreview();
    const interval = setInterval(fetchPreview, 5000); // refresh every 5 seconds

    const unsubscribe = data.subscribeToStudentDrawing(studentId, classCode, () => {
      console.log("Canvas preview image length:", preview?.length);
      console.log("Canvas preview content:", preview);
      fetchPreview(); // trigger full refresh
    });

    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, [studentId, classCode]);

  console.log("Canvas preview image:", preview);
  console.log("Preview type:", typeof preview);

  return (
    <div className="w-full h-72 flex items-center justify-center gap-4 overflow-hidden rounded-lg border-4 border-blue-500 bg-white">
      {/* Always render known-good base64 image for debugging
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/P6/BUQAAAABJRU5ErkJggg=="
        alt="Test Preview"
        className="w-24 h-24 border border-yellow-500"
        onLoad={() => console.log("✅ Hardcoded test image loaded")}
        onError={(e) => console.error("❌ Hardcoded test image failed", e)}
      /> */}

      {/* {preview && (
        <img
          src={preview.startsWith('data:image') ? preview : `data:image/png;base64,${preview}`}
          alt="Canvas Preview"
          className="w-50 h-50 border border-green-500"
          onLoad={() => console.log("✅ Preview image loaded")}
          onError={(e) => console.error("❌ Preview image failed to load", e)}
        />
      )} */}

      {/* Render actual canvas_state preview */}
      {preview ? (
        <img
          src={preview.startsWith('data:image') ? preview : `data:image/png;base64,${preview}`}
          alt="Drawing Preview"
          className="max-h-full max-w-full object-contain"
          onLoad={() => console.log("✅ Image loaded successfully")}
          onError={(e) => {
            console.error("❌ Image failed to load", e);
            (e.target as HTMLImageElement).style.border = '3px solid red';
          }}
        />
      ) : (
        <div className="text-red-600 text-sm">⚠️ No preview available</div>
      )}
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const [isTeacher, setIsTeacher] = useState(false);
  const [classCode, setClassCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [studentId, setStudentId] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [editableDisplayName, setEditableDisplayName] = useState('');
  const [classroomId, setClassroomId] = useState<number | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [demo, setDemo] = useState(false);

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

  const createClassroom = async () => {
    if (!demo && !turnstileToken) {
      setError("Please complete the Turnstile challenge.");
      return;
    }

    setIsTeacher(true);
    const newClassCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  
    console.log('Creating classroom with code:', newClassCode);
  
    const { data: rows, error } = await data.createClassroom(newClassCode);

    console.log("Supabase response:", { data: rows, error });
  
    if (error) {
      console.error('Error creating classroom:', error.message);
      setError(`Failed to create classroom: ${error.message}`);
      return;
    }
  
    if (!rows || rows.length === 0) {
      console.error('No data returned from Supabase');
      setError('Failed to create classroom: No data returned.');
      return;
    }
  
    console.log('Classroom created successfully:', rows);
    setClassCode(newClassCode);
    setClassroomId(rows[0].id);
  };

  const joinClassroom = async () => {
    if (!inputCode) return;
    if (!demo && !turnstileToken) {
      setError("Please complete the Turnstile challenge.");
      return;
    }

    // Generate a unique student ID
    const newStudentId = Math.random().toString(36).substring(2, 10);

    // If displayName is empty, generate a random two-word name
    const nameToUse = sanitize(displayName || generateTwoWordName());

    console.log('Attempting to join room with:', { inputCode, newStudentId, nameToUse });

    // Query the classrooms table to get the numeric id using the room code
    const sanitizedCode = sanitize(inputCode);
    const { data: classroomData, error: classroomError } = await data.findClassroomByCode(sanitizedCode);

    if (classroomError || !classroomData) {
      setError(classroomError?.message ?? 'Room not found');
      return;
    }

    // Insert a new student record into the 'classroom_students' table using the numeric classroom id
    const { data: joinData, error } = await data.addStudent(classroomData.id, newStudentId, nameToUse);

    console.log('Join response:', { data: joinData, error });

    if (error) {
      setError(error.message);
      return;
    }

    // Set the student ID, display name, and classroomId state
    setStudentId(newStudentId);
    setDisplayName(nameToUse);
    setClassroomId(classroomData.id);
    
    // Use the room code for display
    setClassCode(sanitizedCode);
  };
  
  useEffect(() => {
    if (!classroomId) return;
  
    const unsubscribe = data.subscribeToStudents(classroomId, {
      onInsert: (row, payload) => {
        console.log('Realtime INSERT payload:', payload);
        setStudents(prevStudents => [...prevStudents, row as unknown as Student]);
      },
      onDelete: (row, payload) => {
        console.log('Realtime DELETE payload:', payload);
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
    const { error } = await data.removeStudent(id, classroomId!);
    if (error) {
      setError(error.message);
    }
  }

  if (!classCode) {
    return (
      <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] 
bg-[size:20px_20px]">
        <Card className="w-full max-w-md border-none">
          <img src="/galleryboardlogo.png" alt="Logo" className="h-[225px] w-auto object-contain -mb-5" />
          <CardContent className="space-y-4">
            {roomsOff && (
              <div className="space-y-2 text-center">
                <Button asChild size="lg" className="h-14 w-full bg-blue-600 text-lg font-semibold text-white shadow-md hover:bg-blue-700">
                  <Link href="/demo">Try the demo</Link>
                </Button>
                <p className="text-sm text-gray-500">
                  Opens a sample classroom with live student boards. No sign-up.
                </p>
                <div className="flex items-center gap-3 pt-2 text-xs uppercase tracking-wide text-gray-400">
                  <span className="h-px flex-1 bg-gray-300" />
                  or
                  <span className="h-px flex-1 bg-gray-300" />
                </div>
              </div>
            )}
            <div className="flex flex-col space-y-2">
              <Input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                placeholder={demo ? `Enter room code (sample room: ${DEMO_ROOM.class_code})` : "Enter room code"}
                className="text-center"
              />
              
              <Button
                onClick={roomsOff ? showRoomsOff : joinClassroom}
                size="lg"
                variant={roomsOff ? "outline" : "default"}
                className={roomsOff
                  ? "w-full text-blue-600 border-blue-600 hover:bg-blue-50"
                  : "w-full bg-blue-500 text-white hover:bg-blue-600"}
                disabled={!canUseRooms}
              >
                Join Room
              </Button>
            </div>
            <Button
              onClick={roomsOff ? showRoomsOff : createClassroom}
              variant="outline"
              className="w-full text-blue-600 border-blue-600 hover:bg-blue-50"
              size="lg"
              disabled={!canUseRooms}
            >
              Create Room
            </Button>
            {roomsOff && showRoomsOffNotice && (
              <p role="status" className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-center text-sm text-amber-900">
                Rooms are turned off for this portfolio version.{' '}
                <Link href="/demo" className="font-medium underline underline-offset-2">
                  Try the full app in demo mode.
                </Link>
              </p>
            )}
            {demo ? (
              <p className="text-center text-sm text-gray-500">
                The bot check is skipped in the demo. Rooms and students here are simulated.
              </p>
            ) : !roomsOff ? (
              <>
                <div className="w-full flex justify-center">
                  <Turnstile
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    theme="light"
                    onVerify={(token) => {
                      console.log("✅ Turnstile token received:", token);
                      setTurnstileToken(token);
                    }}
                    className="self-center max-w-md"
                  />
                </div>
                <Button asChild variant="outline" size="lg" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50">
                  <Link href="/demo">Try the demo</Link>
                </Button>
              </>
            ) : null}
          </CardContent>
        </Card>
    </div>
    );
  }

  if (isTeacher) {
    return (
      <div className="p-8 h-screen bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] 
bg-[size:20px_20px]">
        <div className="bg-white rounded-md shadow p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-black">Room Code: {classCode}</h2>
              <p className="text-gray-500">Connected Guests: {students.length}</p>
              {demo && (
                <p className="mt-1 text-sm text-amber-700">
                  Simulated: you are signed in as this sample room&apos;s teacher, and the students and
                  their drawings are sample data. Nothing is saved.
                </p>
              )}
            </div>
            {demo && (
              <Button onClick={drawAsDemoStudent} className="shrink-0 bg-blue-500 text-white hover:bg-blue-600">
                Draw as a student
              </Button>
            )}
          </div>
        </div>

        {selectedStudent ? (
          <div className={`fixed inset-x-0 bottom-0 ${demo ? 'top-8' : 'top-0'} z-50 flex flex-col bg-white`}>
            <div className="flex justify-between items-center p-4 shadow">
              <h2 className="text-2xl font-bold">Viewing {students.find(s => s.student_id === selectedStudent)?.displayName || selectedStudent}&apos;s Board</h2>
              <button
                onClick={() => setSelectedStudent(null)}
                className="border border-gray-400 rounded px-3 py-1"
              >
                Close Full Screen
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <Whiteboard
                studentId={selectedStudent}
                classCode={classCode}
                readOnly
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {students.map((student) => (
              <Card
                key={student.student_id}
                className="relative cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedStudent(student.student_id)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeStudent(student.student_id);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  X
                </button>
                <CardContent className="p-4">
                <DrawingPreview
                studentId={student.student_id}
                classCode={classCode}
                />
                  <p className="mt-2 text-center text-sm text-black">{student.displayName}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-8 bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] bg-[size:20px_20px]">
      <div></div>
      <Card className="mb-6">
        <CardContent className="p-6">
          {demo && classroomId && (
            <Button onClick={() => setIsTeacher(true)} variant="outline" className="float-right ml-4">
              Back to teacher view
            </Button>
          )}
          <h2 className="text-2xl font-bold text-gray-700">Room Code: {classCode}</h2>
          <p className="text-gray-500">Your Name: {displayName}</p>
          {demo && (
            <p className="mt-1 text-sm text-amber-700">
              Saving is simulated: your drawing stays in this browser tab and is gone when you leave.
            </p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <Whiteboard studentId={studentId} classCode={classCode} />
        </CardContent>
      </Card>
    </div>
  );
}