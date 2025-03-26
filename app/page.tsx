'use client';

import { useEffect, useState } from 'react';
import Whiteboard from './components/Whiteboard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { generateTwoWordName } from '@/lib/name-generator';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const Turnstile = dynamic(() =>
  import('next-turnstile').then(mod => mod.Turnstile), { ssr: false }
);

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
      const { data, error } = await supabase
        .from('drawing_updates')
        .select('canvas_state')
        .eq('student_id', studentId)
        .eq('classroom_code', classCode) // filter by room code
        .order('updated_at', { ascending: false })
        .limit(1);

      console.log('🎯 Supabase response:', { data, error });

      if (error) {
        console.error('Error fetching drawing preview for', studentId, error);
      } else {
        const canvasState: string | null = data?.[0]?.canvas_state ?? null;
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

    const channel = supabase
      .channel('drawing-preview')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'drawing_updates',
          filter: `student_id=eq.${studentId}&classroom_code=eq.${classCode}`,
        },
        (payload) => {
          console.log("Canvas preview image length:", preview?.length);
          console.log("Canvas preview content:", preview);
          fetchPreview(); // trigger full refresh
        }
      )
      .subscribe();

    return () => {
      clearInterval(interval);
      channel.unsubscribe();
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

  const createClassroom = async () => {
    if (!turnstileToken) {
      setError("Please complete the Turnstile challenge.");
      return;
    }

    console.log("Supabase client test:", supabase);
    console.log("Supabase URL test:", (supabase as any).rest?.url);
    console.log("🧪 Supabase URL check:", (supabase as any).rest?.url);
    setIsTeacher(true);
    const newClassCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  
    console.log('Creating classroom with code:', newClassCode);
  
    const { data, error } = await supabase
      .from('classrooms')
      .insert([{ class_code: newClassCode, teacher_id: 'teacher_placeholder' }])
      .select()

    console.log("Supabase response:", { data, error });
  
    if (error) {
      console.error('Error creating classroom:', error.message);
      setError(`Failed to create classroom: ${error.message}`);
      return;
    }
  
    if (!data || data.length === 0) {
      console.error('No data returned from Supabase');
      setError('Failed to create classroom: No data returned.');
      return;
    }
  
    console.log('Classroom created successfully:', data);
    setClassCode(newClassCode);
    setClassroomId(data[0].id);
  };

  const joinClassroom = async () => {
    if (!inputCode) return;
    if (!turnstileToken) {
      setError("Please complete the Turnstile challenge.");
      return;
    }

    // Generate a unique student ID
    const newStudentId = Math.random().toString(36).substring(2, 10);

    // If displayName is empty, generate a random two-word name
    const nameToUse = displayName || generateTwoWordName();

    console.log('Attempting to join room with:', { inputCode, newStudentId, nameToUse });

    // Query the classrooms table to get the numeric id using the room code
    const { data: classroomData, error: classroomError } = await supabase
      .from('classrooms')
      .select('id')
      .eq('class_code', inputCode)
      .single();

    if (classroomError) {
      setError(classroomError.message);
      return;
    }

    // Insert a new student record into the 'classroom_students' table using the numeric classroom id
    const { data, error } = await supabase
      .from('classroom_students')
      .insert([{ classroom_id: classroomData.id, student_id: newStudentId, display_name: nameToUse }])
      .single();

    console.log('Join response:', { data, error });

    if (error) {
      setError(error.message);
      return;
    }

    // Set the student ID, display name, and classroomId state
    setStudentId(newStudentId);
    setDisplayName(nameToUse);
    setClassroomId(classroomData.id);
    
    // Use the room code for display
    setClassCode(inputCode);
  };
  
  useEffect(() => {
    if (!classroomId) return;
  
    const channel = supabase.channel('student-insert')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'classroom_students',
          filter: `classroom_id=eq.${classroomId}`
        },
        (payload) => {
          console.log('Realtime INSERT payload:', payload);
          setStudents(prevStudents => [...prevStudents, payload.new as Student]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'classroom_students',
          filter: `classroom_id=eq.${classroomId}`
        },
        (payload) => {
          console.log('Realtime DELETE payload:', payload);
          const deletedStudentId = payload.old.student_id;
          setStudents(prevStudents =>
            prevStudents.filter(s => s.student_id !== deletedStudentId)
          );        }
      )
      .subscribe();
  
    return () => {
      channel.unsubscribe();
    };
  }, [classroomId]);

  const removeStudent = async (id: string) => {
    setStudents((prevStudents) => prevStudents.filter((student) => student.student_id !== id));
    const { error } = await supabase
      .from('classroom_students')
      .delete()
      .eq('student_id', id)
      .eq('classroom_id', classroomId!);
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
            <div className="flex flex-col space-y-2">
              <Input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                placeholder="Enter room code"
                className="text-center"
              />
              
              <Button
                onClick={joinClassroom}
                size="lg"
                className="w-full bg-blue-500 text-white hover:bg-blue-600"
                disabled={!turnstileToken}
              >
                Join Room
              </Button>
            </div>
            <Button
              onClick={createClassroom}
              variant="outline"
              className="w-full text-blue-600 border-blue-600 hover:bg-blue-50"
              size="lg"
              disabled={!turnstileToken}
            >
              Create Room
            </Button>
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
            </div>
          </div>
        </div>

        {selectedStudent ? (
          <div className="fixed inset-0 z-50 flex flex-col bg-white">
            <div className="flex justify-between items-center p-4 shadow">
              <h2 className="text-2xl font-bold">Viewing {selectedStudent}&apos;s Board</h2>
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
          <h2 className="text-2xl font-bold text-gray-700">Room Code: {classCode}</h2>
          <p className="text-gray-500">Your Name: {displayName}</p>
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