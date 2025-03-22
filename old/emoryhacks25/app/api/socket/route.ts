import { Server } from 'socket.io';
import { NextResponse } from 'next/server';

const io = new Server({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Store classroom data
const classrooms = new Map();

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('create-classroom', (teacherId: string) => {
    const classCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    classrooms.set(classCode, {
      teacherId,
      students: new Map(), // Map to store student IDs and their canvas data
    });
    socket.join(classCode);
    socket.emit('classroom-created', { classCode, teacherId });
  });

  socket.on('join-classroom', (data: { classCode: string; studentId: string }) => {
    const { classCode, studentId } = data;
    const classroom = classrooms.get(classCode);
    
    if (classroom) {
      socket.join(classCode);
      classroom.students.set(studentId, {
        id: studentId,
        canvasData: null
      });
      
      // Notify teacher of new student
      socket.to(classCode).emit('student-joined', { 
        studentId,
        students: Array.from(classroom.students.values())
      });
      
      // Send existing canvas data to the new student if available
      const studentData = classroom.students.get(studentId);
      if (studentData?.canvasData) {
        socket.emit('load-canvas', {
          studentId,
          canvasData: studentData.canvasData
        });
      }
    }
  });

  socket.on('draw-update', (data: { 
    classCode: string; 
    studentId: string; 
    drawData: any | null;
    canvasState: string; // Base64 string of the entire canvas
  }) => {
    const { classCode, studentId, drawData, canvasState } = data;
    const classroom = classrooms.get(classCode);
    
    if (classroom) {
      // Update stored canvas state
      if (classroom.students.has(studentId)) {
        classroom.students.get(studentId).canvasData = canvasState;
      }
      
      // Emit the update to everyone in the classroom except the sender
      socket.to(classCode).emit('draw-update-received', { 
        studentId, 
        drawData: drawData || null,
        canvasState 
      });
    }
  });

  socket.on('request-canvas-state', (data: { classCode: string; studentId: string }) => {
    const { classCode, studentId } = data;
    const classroom = classrooms.get(classCode);
    
    if (classroom && classroom.students.has(studentId)) {
      const canvasState = classroom.students.get(studentId).canvasData;
      if (canvasState) {
        socket.emit('canvas-state-update', {
          studentId,
          canvasState
        });
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    // Clean up classrooms data if needed
    for (const [code, classroom] of classrooms.entries()) {
      if (classroom.students.has(socket.id)) {
        classroom.students.delete(socket.id);
        io.to(code).emit('student-left', { 
          studentId: socket.id,
          students: Array.from(classroom.students.values())
        });
      }
    }
  });
});

io.listen(3001);

export async function GET() {
  return new NextResponse('Socket.IO server is running.', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST() {
  return new NextResponse('Socket.IO server is running.', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 