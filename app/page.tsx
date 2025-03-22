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
    // Initialize socket connection
    try {
      socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
        transports: ['websocket']
      });

      socket.on('connect', () => {
        console.log('Connected to server');
        setIsConnected(true);
        setError(null);
        if (socket.id) {
          setStudentId(socket.id);
          const newName = generateTwoWordName();
          setDisplayName(newName);
          console.log('Generated name:', newName);
        }
      });

      socket.on('connect_error', (err) => {
        console.error('Connection error:', err);
        setError('Failed to connect to GalleryBoard server. Please try connecting again.');
        setIsConnected(false);
      });

      socket.on('classroom-created', ({ classCode: newClassCode }: { classCode: string }) => {
        setClassCode(newClassCode);
      });

      socket.on('student-joined', ({ studentId, displayName, students: updatedStudents }: { studentId: string, displayName: string, students: Student[] }) => {
        console.log('Student joined:', { studentId, displayName });
        setStudents(updatedStudents);
      });

      socket.on('name-assigned', ({ displayName: assignedName }: { displayName: string }) => {
        console.log('Name assigned:', assignedName);
        setDisplayName(assignedName);
      });

      socket.on('student-left', ({ students: updatedStudents }: { students: Student[] }) => {
        setStudents(updatedStudents);
      });

      return () => {
        socket.disconnect();
      };
    } catch (err) {
      console.error('Socket initialization error:', err);
      setError('Failed to initialize connection. Please refresh the page.');
    }
  }, []);

  const createClassroom = () => {
    if (!socket.id) return;
    setIsTeacher(true);
    socket.emit('create-classroom', socket.id);
  };

  const joinClassroom = () => {
    if (!socket.id || !inputCode) return;
    console.log('Joining classroom with name:', displayName);
    socket.emit('join-classroom', { 
      classCode: inputCode, 
      studentId: socket.id,
      displayName: displayName
    });
    setClassCode(inputCode);
  };

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card>
          <CardContent className="p-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="text-center mt-4">
              {error || 'Connecting to GalleryBoard server...'}
            </p>
            {error && (
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="mt-4 w-full"
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
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">GalleryBoard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={createClassroom}
              className="w-full"
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
                variant="secondary"
                size="lg"
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
      <div className="p-8">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Class Code: {classCode}</h2>
                <p className="text-muted-foreground">Connected Students: {students.length}</p>
              </div>
              {selectedStudent && (
                <Button
                  onClick={() => setSelectedStudent(null)}
                  variant="outline"
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
              <Card key={student.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <Whiteboard
                    socket={socket}
                    studentId={student.id}
                    classCode={classCode}
                    isTeacher={true}
                    onBoardClick={() => setSelectedStudent(student.id)}
                  />
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    {student.displayName}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-8">
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold">Class Code: {classCode}</h2>
          <p className="text-muted-foreground">Your Name: {displayName}</p>
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