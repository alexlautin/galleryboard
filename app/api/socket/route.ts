import { NextResponse } from 'next/server';
import { initSocket } from '@/lib/socket-server';

const classrooms = new Map<string, {
  teacherId: string;
  students: Map<string, { displayName: string }>;
}>();

function generateClassCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function GET(req: Request) {
  try {
    const res = new NextResponse();
    const server = (res as any).socket?.server;

    if (!server) {
      return new NextResponse('Socket server not initialized', { status: 500 });
    }

    if (!server.io) {
      console.log('Initializing Socket.IO server...');
      const io = initSocket(server);
      server.io = io;
    }

    return res;
  } catch (error) {
    console.error('Socket.IO initialization error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  return GET(req);
}

export async function PUT(req: Request) {
  return GET(req);
}

export async function DELETE(req: Request) {
  return GET(req);
}

const ioHandler = (req: Request, res: NextResponse) => {
  if (!res.socket.server.io) {
    console.log('Initializing Socket.IO server...');
    const httpServer: NetServer = res.socket.server as any;
    const io = initSocket(httpServer);

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on('create-classroom', ({ teacherId }) => {
        let classCode: string;
        do {
          classCode = generateClassCode();
        } while (classrooms.has(classCode));

        classrooms.set(classCode, {
          teacherId,
          students: new Map()
        });

        console.log(`Creating classroom ${classCode} for teacher ${teacherId}`);
        socket.join(`classroom-${classCode}`);
        socket.emit('classroom-created', { classCode, teacherId });
      });

      socket.on('join-classroom', ({ classCode, studentId, displayName }) => {
        const classroom = classrooms.get(classCode);
        console.log('Join request:', { classCode, studentId, displayName });

        if (!classroom) {
          socket.emit('error', { message: 'Classroom not found' });
          return;
        }

        // If student is already in the classroom, update their display name
        if (classroom.students.has(studentId)) {
          console.log(`Student ${studentId} reconnecting to classroom ${classCode}`);
          classroom.students.set(studentId, { displayName });
        } else {
          classroom.students.set(studentId, { displayName });
          console.log(`Student ${studentId} (${displayName}) joining classroom ${classCode}`);
        }

        socket.join(`classroom-${classCode}`);

        // Get current students list
        const allStudents = [
          {
            id: classroom.teacherId,
            displayName: 'Teacher'
          },
          ...Array.from(classroom.students.entries()).map(([id, data]) => ({
            id,
            displayName: data.displayName
          }))
        ];

        // Send student-joined event to all clients
        io.to(`classroom-${classCode}`).emit('student-joined', {
          studentId,
          displayName,
          students: allStudents
        });

        // Send teacher-update event to ensure teacher has latest student list
        io.to(`classroom-${classCode}`).emit('teacher-update', {
          studentId,
          displayName,
          students: allStudents
        });
      });

      socket.on('draw-update', ({ classCode, studentId, drawData, canvasState }) => {
        console.log('Draw update:', { classCode, studentId, hasDrawData: !!drawData, hasCanvasState: !!canvasState });
        
        // Broadcast to all clients in the classroom except the sender
        socket.to(`classroom-${classCode}`).emit('draw-update', {
          studentId,
          drawData,
          canvasState
        });
      });

      socket.on('leave-classroom', ({ classCode, studentId }) => {
        const classroom = classrooms.get(classCode);
        if (classroom) {
          classroom.students.delete(studentId);
          console.log(`Student ${studentId} leaving classroom ${classCode}`);

          // Get updated students list
          const allStudents = [
            {
              id: classroom.teacherId,
              displayName: 'Teacher'
            },
            ...Array.from(classroom.students.entries()).map(([id, data]) => ({
              id,
              displayName: data.displayName
            }))
          ];

          // Notify all clients in the classroom
          io.to(`classroom-${classCode}`).emit('student-left', { students: allStudents });

          // Clean up empty classrooms
          if (classroom.students.size === 0 && classroom.teacherId === studentId) {
            classrooms.delete(classCode);
            console.log(`Classroom ${classCode} deleted`);
          }
        }

        socket.leave(`classroom-${classCode}`);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}; 