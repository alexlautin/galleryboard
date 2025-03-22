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

  useEffect(() => {
    const initSocket = async () => {
      try {
        // Initialize socket connection
        const socketUrl = 'http://localhost:3001';
        socket = io(socketUrl, {
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          autoConnect: true,
        });

        // Set up event listeners
        socket.on('connect', () => {
          setIsConnected(true);
          setError(null);
          if (socket.id) {
            setStudentId(socket.id);
            const newName = generateTwoWordName();
            setDisplayName(newName);
          }
        });

        socket.on('connect_error', (err) => {
          setError('Failed to connect to GalleryBoard server. Please try again.');
          setIsConnected(false);
        });

        socket.on('classroom-created', ({ classCode: newClassCode }) => {
          setClassCode(newClassCode);
          // Update the URL with the classCode
          window.history.pushState(null, '', `?classCode=${newClassCode}&mode=${isTeacher ? 'teacher' : 'student'}`);
        });

        socket.on('student-joined', ({ students: updatedStudents }) => {
          setStudents(updatedStudents);
        });

        socket.on('student-left', ({ students: updatedStudents }) => {
          setStudents(updatedStudents);
        });

        // Initialize connection
        await fetch('/api/socket/io');
      } catch (err) {
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
    // Update the URL with the classCode
    window.history.pushState(null, '', `?classCode=${inputCode}&mode=student`);
  };

  useEffect(() => {
    // Check if there's a classCode and mode in the URL on initial load
    const params = new URLSearchParams(window.location.search);
    const classCodeFromUrl = params.get('classCode');
    const modeFromUrl = params.get('mode');
    if (classCodeFromUrl) {
      setClassCode(classCodeFromUrl);
      if (modeFromUrl === 'teacher') {
        setIsTeacher(true);
      } else {
        setIsTeacher(false);
      }
      socket.emit('join-classroom', {
        classCode: classCodeFromUrl,
        studentId: studentId,
        displayName: displayName,
      });
    }
  }, [studentId, displayName]);

  // Filter out the teacher from the list of students (if any)
  const filteredStudents = students.filter(student => student.id !== studentId);

  // Only render students after the state has been populated
  if (!isConnected || !students.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-center text-gray-700">
              {error || 'Connecting to GalleryBoard server...'}
            </p>
            {error && (
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="w-full"
              >
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
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
        <img src="/galleryboardlogo.jpeg" alt="Logo" className="h-10 w-auto" />
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-black">GalleryBoard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={createClassroom}
              className="w-full bg-blue-500 text-white hover:bg-blue-600"
              size="lg"
            >
              Create Classroom (Teacher)
            </Button>
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
                variant="outline"
                size="lg"
                className="w-full text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                Join Classroom
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isTeacher) {
    return (
      <div className="p-8 bg-white">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-black">Class Code: {classCode}</h2>
                <p className="text-gray-500">Connected Students: {filteredStudents.length}</p>
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
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <Card key={student.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedStudent(student.id)}>
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
              ))
            ) : (
              <p className="text-center text-gray-500">No students connected yet</p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-8 bg-white">
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
