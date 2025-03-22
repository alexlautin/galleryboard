'use client';

import { useEffect, useState } from 'react';
import { pusherClient } from '@/lib/pusher';
import Whiteboard from './components/Whiteboard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateTwoWordName } from '@/lib/name-generator';

interface Student {
  id: string;
  displayName: string;
}

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
    // Generate a unique ID for this client
    const uniqueId = Math.random().toString(36).substring(2, 15);
    setStudentId(uniqueId);
    setDisplayName(generateTwoWordName());

    // Log environment variables (without sensitive data)
    console.log('Environment:', {
      isDev: process.env.NODE_ENV === 'development',
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      hasKey: !!process.env.NEXT_PUBLIC_PUSHER_KEY,
      hasAppId: !!process.env.NEXT_PUBLIC_PUSHER_APP_ID,
    });

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
    });

    pusherClient.connection.bind('disconnected', () => {
      console.log('Pusher disconnected');
      setIsConnected(false);
      setError('Disconnected from server. Attempting to reconnect...');
    });

    // Connect to Pusher
    if (pusherClient.connection.state !== 'connected') {
      console.log('Initializing Pusher connection...');
      pusherClient.connect();
    }

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
  }, []);

  useEffect(() => {
    if (!classCode) return;

    // Subscribe to classroom events
    const channel = pusherClient.subscribe(`classroom-${classCode}`);

    channel.bind('classroom-created', (data: { classCode: string; teacherId: string }) => {
      console.log('Classroom created:', data.classCode);
      setClassCode(data.classCode);
    });

    channel.bind('student-joined', (data: { studentId: string; displayName: string; students: Student[] }) => {
      console.log('Student joined:', data);
      setStudents(data.students);
    });

    channel.bind('student-left', (data: { students: Student[] }) => {
      setStudents(data.students);
    });

    channel.bind('draw-update', (data: { studentId: string; drawData: any; canvasState: string }) => {
      // Handle draw updates in the Whiteboard component
      console.log('Draw update received:', data);
    });

    return () => {
      pusherClient.unsubscribe(`classroom-${classCode}`);
    };
  }, [classCode]);

  const createClassroom = async () => {
    try {
      const response = await fetch('/api/pusher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'create-classroom',
          teacherId: studentId
        })
      });

      const data = await response.json();
      if (data.classCode) {
        setIsTeacher(true);
        setClassCode(data.classCode);
      }
    } catch (err) {
      console.error('Error creating classroom:', err);
      setError('Failed to create classroom');
    }
  };

  const joinClassroom = async () => {
    if (!inputCode) return;
    
    try {
      const response = await fetch('/api/pusher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'join-classroom',
          classCode: inputCode,
          studentId,
          displayName
        })
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
        return;
      }

      setClassCode(inputCode);
    } catch (err) {
      console.error('Error joining classroom:', err);
      setError('Failed to join classroom');
    }
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
                socket={pusherClient}
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
                    socket={pusherClient}
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
          <Whiteboard socket={pusherClient} studentId={studentId} classCode={classCode} />
        </CardContent>
      </Card>
    </div>
  );
} 