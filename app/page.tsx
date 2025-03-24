'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Whiteboard from './components/Whiteboard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateTwoWordName } from '@/lib/name-generator';
import type { ClientToServerEvents, ServerToClientEvents, Student as StudentType } from '@/types/socket';

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

interface Student extends StudentType {}

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [classCode, setClassCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [studentId, setStudentId] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [editableDisplayName, setEditableDisplayName] = useState('');

  useEffect(() => {
    const initSocket = async () => {
      console.log("⚡ initializing socket...");
      try {
        const socketUrl = 'https://galleryboard.onrender.com';
        socket = io(socketUrl, {
          transports: ['websocket'],      // Force WebSocket (no long-polling fallback)
          withCredentials: true,          // Allow cookies if needed (aligns with CORS)
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          autoConnect: true,
        });
        console.log("✅ socket.io initialized");

        let connectedOnce = false;
        socket.on('connect', () => {
          console.log('Connected to server. Socket ID:', socket.id);
          setIsConnected(true);
          setError(null);
          if (socket.id) {
            setStudentId(socket.id);
            const newName = generateTwoWordName();
            setDisplayName(newName);
            setEditableDisplayName(newName);
          }
        });

        socket.on('connect_error', (err) => {
          console.error("🔴 Socket connection error:", err);
          if (!connectedOnce) {
          console.error('Socket connection error:', err);
          setError('Failed to connect to GalleryBoard server. Please try again.');
          setIsConnected(false);
          }
        });

        socket.on('classroom-created', ({ classCode: newClassCode }) => {
          setClassCode(newClassCode);
          window.history.pushState(null, '', `?classCode=${newClassCode}&mode=teacher`);
        });

        socket.on('student-joined', ({ students: updatedStudents }) => {
          setStudents(updatedStudents);
        });

        socket.on('student-left', ({ students: updatedStudents }) => {
          setStudents(updatedStudents);
        });

        // await fetch('/api/socket/io');
      } catch (error) {
        console.error('Failed to initialize connection:', error);
        setError('Failed to initialize connection. Please refresh the page.');
      }
    };

    initSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const createClassroom = () => {
    if (!socket || !socket.connected) {
      setError('Socket not connected yet. Please wait a moment.');
      return;
    }
    setIsTeacher(true);
    if (socket.id) {
      socket.emit('create-classroom', socket.id);
    } else {
      setError('Socket ID is undefined. Please try again.');
    }
  };

  const joinClassroom = () => {
    if (!socket.id || !inputCode) return;
    socket.emit('join-classroom', {
      classCode: inputCode,
      studentId: socket.id,
      displayName: displayName,
    });
    setClassCode(inputCode);
    window.history.pushState(null, '', `?classCode=${inputCode}&mode=student`);
  };

  const removeStudent = (id: string) => {
    setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
    socket.emit('remove-student', { studentId: id, classCode });
  };

  useEffect(() => {
    if (isTeacher && selectedStudent) {
      socket.emit('request-canvas-state', { studentId: selectedStudent, classCode });
    }
  }, [isTeacher, selectedStudent, classCode]);

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] 
bg-[size:20px_20px]">
        <Card className="w-full max-w-md bg-[#fdfdfd] border-2 border-[#e6e4e0] rounded-lg">
          <CardContent className="p-6 space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-center text-gray-700">{error || 'Connecting to GalleryBoard server...'}</p>
            {error && (
              <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
                Retry Connection
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!classCode) {
    return (
      <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] 
bg-[size:20px_20px]">
        <Card className="w-full max-w-md border-none">
          <img src="/galleryboardlogo.png" alt="Logo" className="h-[225px] w-auto" />
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
              >
                Join Room
              </Button>
            </div>
            <Button
              onClick={createClassroom}
              variant="outline"
              className="w-full text-blue-600 border-blue-600 hover:bg-blue-50"
              size="lg"
            >
              Create Room
            </Button>
          </CardContent>
        </Card>
    </div>
    );
  }

  if (isTeacher) {
    return (
      <div className="p-8 h-screen bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] 
bg-[size:20px_20px]">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-black">Room Code: {classCode}</h2>
                <p className="text-gray-500">Connected Guests: {students.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {selectedStudent ? (
          // Full-screen overlay
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
                socket={socket}
                studentId={selectedStudent}
                classCode={classCode}
                isTeacher={true}
              />
            </div>
          </div>
        ) : (
          // Grid of student boards
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {students.map((student) => (
              <Card
                key={student.id}
                className="relative cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedStudent(student.id)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeStudent(student.id);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  X
                </button>
                <CardContent className="p-4">
                  <Whiteboard
                    socket={socket}
                    studentId={student.id}
                    classCode={classCode}
                    isTeacher={true}
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
    <div className="p-8 bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] 
bg-[size:20px_20px]">
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-gray-700">Room Code: {classCode}</h2>
          <p className="text-gray-500">Your Name: {displayName}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <Whiteboard socket={socket} studentId={studentId} classCode={classCode} />
        </CardContent>
      </Card>
    </div>
  );
}