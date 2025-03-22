import { Server as SocketIOServer } from 'socket.io';
import { NextResponse } from 'next/server';
import type { NextApiResponseServerIO } from '@/types/socket';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

let io: SocketIOServer;

const classrooms = new Map<string, {
  teacherId: string;
  students: Map<string, { displayName: string }>;
}>();

function generateClassCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Create a map to store active connections
const connections = new Map();

export async function GET(req: Request) {
  if (!io) {
    io = new SocketIOServer({
      path: '/api/socket/io',
      addTrailingSlash: false,
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
      transports: ['websocket', 'polling'],
    });

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);
      connections.set(socket.id, socket);

      socket.on('create-classroom', (teacherId: string) => {
        let classCode: string;
        do {
          classCode = generateClassCode();
        } while (classrooms.has(classCode));

        classrooms.set(classCode, {
          teacherId,
          students: new Map()
        });

        socket.join(classCode);
        socket.emit('classroom-created', { classCode, teacherId });
      });

      socket.on('join-classroom', (data: { classCode: string; studentId: string; displayName: string }) => {
        const { classCode, studentId, displayName } = data;
        const classroom = classrooms.get(classCode);

        if (!classroom) {
          socket.emit('error', { message: 'Classroom not found' });
          return;
        }

        // Add student to classroom
        classroom.students.set(studentId, { displayName });
        socket.join(classCode);

        // Notify all clients in the classroom about the new student
        io.to(classCode).emit('student-joined', {
          studentId,
          displayName,
          students: Array.from(classroom.students.entries()).map(([id, data]) => ({
            id,
            displayName: data.displayName
          }))
        });

        // Confirm the display name to the joining student
        socket.emit('name-assigned', { displayName });
      });

      socket.on('draw-update', (data: {
        classCode: string;
        studentId: string;
        drawData: any;
        canvasState: string;
      }) => {
        const { classCode, studentId, drawData, canvasState } = data;
        
        // Broadcast the drawing update to all clients in the classroom
        socket.to(classCode).emit('draw-update-received', {
          studentId,
          drawData,
          canvasState
        });
      });

      socket.on('disconnecting', () => {
        console.log('Client disconnected:', socket.id);
        connections.delete(socket.id);
        
        // Clean up classrooms data if needed
        for (const [code, classroom] of classrooms.entries()) {
          if (classroom.students.has(socket.id)) {
            classroom.students.delete(socket.id);
            io.to(code).emit('student-left', { 
              students: Array.from(classroom.students.entries()).map(([id, data]) => ({
                id,
                displayName: data.displayName
              }))
            });

            // If no students left and teacher is gone, remove the classroom
            if (classroom.students.size === 0 && classroom.teacherId === socket.id) {
              classrooms.delete(code);
            }
          }
        }
      });
    });
  }

  // Return a response to acknowledge the WebSocket upgrade
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(req: Request) {
  return GET(req);
} 