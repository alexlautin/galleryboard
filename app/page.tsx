'use client';

import { useEffect, useState } from 'react';
import { pusherClient } from '@/lib/pusher';
import Whiteboard from './components/Whiteboard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateTwoWordName } from '@/lib/name-generator';
import type { Student } from '@/types/socket';

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
        });
      }
    });

    channel.bind('error', (data: { message: string }) => {
      console.error('Classroom error:', data.message);
      setError(data.message);
    });

    // Log when the channel is successfully subscribed
    channel.bind('pusher:subscription_succeeded', () => {
      console.log('Successfully subscribed to channel:', `classroom-${classCode}`);
    });

    // Log when the channel subscription fails
    channel.bind('pusher:subscription_error', (error: any) => {
      console.error('Failed to subscribe to channel:', error);
    });

    return () => {
      console.log('Cleaning up classroom event listeners');
      channel.unbind_all();
      pusherClient.unsubscribe(`classroom-${classCode}`);
    };
  }, [classCode, isTeacher]);

  const createClassroom = async () => {
    try {
      console.log('Creating classroom for teacher:', studentId);
      const response = await fetch('/api/pusher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'create-classroom',
          teacherId: studentId
        })
      });

      const data = await response.json();
      console.log('Classroom creation response:', data);
      
      if (data.error) {
        console.error('Error creating classroom:', data.error);
        setError(data.error);
        return;
      }

      if (!data.classCode) {
        console.error('No class code received in response');
        setError('Failed to create classroom: No class code received');
        return;
      }

      console.log('Setting up teacher dashboard with class code:', data.classCode);
      setIsTeacher(true);
      setClassCode(data.classCode);
      
      // Initialize students array with just the teacher
      const initialStudents = [{
        id: studentId,
        displayName: 'Teacher'
      }];
      console.log('Initializing teacher dashboard with students:', initialStudents);
      setStudents(initialStudents);
    } catch (err) {
      console.error('Error creating classroom:', err);
      setError('Failed to create classroom');
    }
  };

  const joinClassroom = async () => {
    if (!inputCode) return;
    
    try {
      console.log('Joining classroom:', inputCode, 'as student:', studentId, 'with name:', displayName);
      const response = await fetch('/api/pusher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'join-classroom',
          classCode: inputCode.toUpperCase(),
          studentId,
          displayName
        })
      });

      const data = await response.json();
      console.log('Join classroom response:', data);
      
      if (data.error) {
        console.error('Error joining classroom:', data.error);
        setError(data.error);
        return;
      }

      // Update the class code and students list
      setClassCode(inputCode.toUpperCase());
      if (data.students) {
        console.log('Received student list from join response:', data.students);
        setStudents(data.students);
      }
      
      // Ensure we're subscribed to the channel
      const channel = pusherClient.subscribe(`classroom-${inputCode.toUpperCase()}`);
      console.log('Subscribed to channel:', `classroom-${inputCode.toUpperCase()}`);
      
      // Log when the channel is successfully subscribed
      channel.bind('pusher:subscription_succeeded', () => {
        console.log('Successfully subscribed to channel:', `classroom-${inputCode.toUpperCase()}`);
      });

      // Log when the channel subscription fails
      channel.bind('pusher:subscription_error', (error: any) => {
        console.error('Failed to subscribe to channel:', error);
      });
      
      console.log('Successfully joined classroom:', inputCode.toUpperCase());
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
              {error || 'Connecting to GalleryBoard server now...'}
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
    console.log('Rendering teacher dashboard:', {
      classCode,
      totalStudents: students.length,
      studentIds: students.map(s => s.id),
      selectedStudent,
      students: students // Log full students array
    });
    
    return (
      <div className="p-8">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Class Code: {classCode}</h2>
                <p className="text-muted-foreground">Connected Students: {students.filter(s => s.id !== studentId).length}</p>
                <p className="text-sm text-muted-foreground">Debug: {students.length} total students</p>
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
            <CardHeader>
              <CardTitle>
                {students.find(s => s.id === selectedStudent)?.displayName || 'Student'}'s Whiteboard
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Whiteboard
                key={`selected-${selectedStudent}`}
                socket={pusherClient}
                studentId={selectedStudent}
                classCode={classCode}
                isTeacher={true}
              />
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {students.filter(student => student.id !== studentId).map((student) => (
              <Card key={student.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {student.displayName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <Whiteboard
                    key={`grid-${student.id}`}
                    socket={pusherClient}
                    studentId={student.id}
                    classCode={classCode}
                    isTeacher={true}
                    onBoardClick={() => setSelectedStudent(student.id)}
                  />
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
          <Whiteboard
            socket={pusherClient}
            studentId={studentId}
            classCode={classCode}
          />
        </CardContent>
      </Card>
    </div>
  );
} 