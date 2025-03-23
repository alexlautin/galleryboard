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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 5424fd71d996aafc1d69b78f447cf5253084e3c5
    const initSocket = async () => {
      try {
        const socketUrl = 'http://localhost:3001';
        socket = io(socketUrl, {
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          autoConnect: true,
<<<<<<< HEAD
=======
        });

        socket.on('connect', () => {
          setIsConnected(true);
          setError(null);
          if (socket.id) {
            setStudentId(socket.id);
            const newName = generateTwoWordName();
            setDisplayName(newName);
            setEditableDisplayName(newName);
          }
        });

        socket.on('connect_error', () => {
          setError('Failed to connect to GalleryBoard server. Please try again.');
          setIsConnected(false);
        });

        socket.on('classroom-created', ({ classCode: newClassCode }) => {
          setClassCode(newClassCode);
          window.history.pushState(null, '', `?classCode=${newClassCode}&mode=${isTeacher ? 'teacher' : 'student'}`);
        });

        socket.on('student-joined', ({ students: updatedStudents }) => {
          setStudents(updatedStudents);
        });

        socket.on('student-left', ({ students: updatedStudents }) => {
          setStudents(updatedStudents);
        });

        await fetch('/api/socket/io');
      } catch {
        setError('Failed to initialize connection. Please refresh the page.');
      }
    };

    initSocket();
=======
    // Generate a unique ID for this client
    const uniqueId = Math.random().toString(36).substring(2, 15);
    setStudentId(uniqueId);
    const newName = generateTwoWordName();
    setDisplayName(newName);

    // Set up Pusher connection handlers
    pusherClient.connection.bind('connected', () => {
      console.log('Pusher connected successfully');
      setIsConnected(true);
      setError(null);
    });

    pusherClient.connection.bind('error', (err: any) => {
      console.error('Pusher connection error:', err);
      setIsConnected(false);
      setError(`Connection error: ${err.message || 'Unknown error'}`);
      
      // Attempt to reconnect after a delay
      setTimeout(() => {
        console.log('Attempting to reconnect...');
        pusherClient.connect();
      }, 3000);
    });

    pusherClient.connection.bind('disconnected', () => {
      console.log('Pusher disconnected');
      setIsConnected(false);
      setError('Disconnected from server. Attempting to reconnect...');
      
      // Attempt to reconnect after a delay
      setTimeout(() => {
        console.log('Attempting to reconnect...');
        pusherClient.connect();
      }, 3000);
    });

    pusherClient.connection.bind('connecting', () => {
      console.log('Connecting to Pusher...');
      setIsConnected(false);
      setError('Connecting to server...');
    });

    // Connect to Pusher
    if (pusherClient.connection.state !== 'connected') {
      console.log('Initializing Pusher connection...');
      pusherClient.connect();
    }
>>>>>>> main

    return () => {
      if (classCode) {
        // Clean up when component unmounts
        fetch('/api/pusher', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'leave-classroom',
            classCode,
            studentId: uniqueId
          })
        }).catch(console.error);
      }

      // Cleanup Pusher connection
      pusherClient.disconnect();
      pusherClient.connection.unbind_all();
    };
  }, [isTeacher]);

  useEffect(() => {
    if (!classCode) return;

    console.log('Setting up classroom event listeners for:', classCode, 'isTeacher:', isTeacher);
    
    // Subscribe to classroom events
    const channel = pusherClient.subscribe(`classroom-${classCode}`);
    console.log('Subscribed to channel:', `classroom-${classCode}`);

    channel.bind('classroom-created', (data: { classCode: string; teacherId: string }) => {
      console.log('Classroom created event received:', data);
      setClassCode(data.classCode);
    });

    channel.bind('student-joined', (data: { studentId: string; displayName: string; students: Student[] }) => {
      console.log('Student joined event received:', {
        event: 'student-joined',
        data,
        currentStudents: students,
        isTeacher
      });
      
      // Update students list
      setStudents(data.students);
      
      // Log the current state after update
      console.log('Updated students state:', {
        totalStudents: data.students.length,
        studentIds: data.students.map(s => s.id),
        isTeacher,
        currentStudents: students
      });
    });

    channel.bind('student-left', (data: { students: Student[] }) => {
      console.log('Student left event received:', {
        event: 'student-left',
        data,
        currentStudents: students,
        isTeacher
      });
      setStudents(data.students);
    });

    channel.bind('teacher-update', (data: { studentId: string; displayName: string; students: Student[] }) => {
      console.log('Teacher update received:', {
        event: 'teacher-update',
        data,
        currentStudents: students,
        isTeacher
      });
      
      if (isTeacher) {
        setStudents(data.students);
        console.log('Updated teacher dashboard with students:', {
          totalStudents: data.students.length,
          studentIds: data.students.map(s => s.id),
          currentStudents: students
>>>>>>> 5424fd71d996aafc1d69b78f447cf5253084e3c5
        });

        socket.on('connect', () => {
          setIsConnected(true);
          setError(null);
          if (socket.id) {
            setStudentId(socket.id);
            const newName = generateTwoWordName();
            setDisplayName(newName);
            setEditableDisplayName(newName);
          }
        });

        socket.on('connect_error', () => {
          setError('Failed to connect to GalleryBoard server. Please try again.');
          setIsConnected(false);
        });

        socket.on('classroom-created', ({ classCode: newClassCode }) => {
          setClassCode(newClassCode);
          window.history.pushState(null, '', `?classCode=${newClassCode}&mode=${isTeacher ? 'teacher' : 'student'}`);
        });

        socket.on('student-joined', ({ students: updatedStudents }) => {
          setStudents(updatedStudents);
        });

        socket.on('student-left', ({ students: updatedStudents }) => {
          setStudents(updatedStudents);
        });

        await fetch('/api/socket/io');
      } catch {
        setError('Failed to initialize connection. Please refresh the page.');
      }
    };

    initSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [isTeacher]);

  const createClassroom = () => {
    if (!socket.id) return;
    setIsTeacher(true);
    socket.emit('create-classroom', socket.id);
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
      <div className="flex flex-col items-center justify-center min-h-screen p-4 flex items-center justify-center min-h-screen bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] 
bg-[size:20px_20px]">
        <Card className="w-full max-w-md border-none">
          <img src="/galleryboardlogo.png" alt="Logo" className="h-[225px] w-auto" />
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                placeholder="Enter class code"
                className="text-center"
              />
              <Button
                onClick={joinClassroom}
                size="lg"
                className="w-full bg-blue-500 text-white hover:bg-blue-600"
              >
                Join Classroom
              </Button>
            </div>
            <Button
              onClick={createClassroom}
              variant="outline"
              className="w-full text-blue-600 border-blue-600 hover:bg-blue-50"
              size="lg"
            >
              Create Classroom (Teacher)
            </Button>
          </CardContent>
        </Card>
    </div>
    );
  }

  if (isTeacher) {
    return (
      <div className="p-8 bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] 
bg-[size:20px_20px]">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-black">Class Code: {classCode}</h2>
                <p className="text-gray-500">Connected Students: {students.length}</p>
              </div>
              {selectedStudent && (
                <Button
                  onClick={() => setSelectedStudent(null)}
                  variant="outline"
                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  Back to Grid
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {selectedStudent ? (
          <Card>
            <CardContent className="p-6">
              <Whiteboard
                socket={socket}
                studentId={selectedStudent}
                classCode={classCode}
                isTeacher={true}
              />
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {students.map((student) => (
              <Card key={student.id} className="relative cursor-pointer hover:shadow-lg transition-shadow">
                <button
                  onClick={() => removeStudent(student.id)}
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
          <h2 className="text-2xl font-bold text-gray-700">Class Code: {classCode}</h2>
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