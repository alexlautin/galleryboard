import { Server as NetServer } from 'http';
import { Server as ServerIO } from 'socket.io';
import { NextApiResponse } from 'next';

const classrooms = new Map<string, {
  teacherId: string;
  students: Map<string, { displayName: string }>;
}>();

function generateClassCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

if (!global.io) {
  global.io = new ServerIO(3001, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
}

const io = global.io;

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

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