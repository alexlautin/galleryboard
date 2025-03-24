const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');
const next = require('next');

const app = express();
const httpServer = createServer(app);
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

// Set up Socket.IO with CORS for Vercel and localhost dev
const io = new Server(httpServer, {
  cors: {
    origin: [
      "https://galleryboard.vercel.app",
      "https://galleryboard.vercel.app/",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// --- Classroom Management ---
const classrooms = new Map();         // Store classroom data
const usedNames = new Map();          // Track used names per classroom

// --- Socket.IO Events ---
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Teacher creates a classroom
  socket.on('create-classroom', (teacherId) => {
    const classCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    classrooms.set(classCode, {
      teacherId,
      students: new Map(),
    });
    usedNames.set(classCode, new Set());
    socket.join(classCode);
    socket.emit('classroom-created', { classCode, teacherId });
  });

  // Student joins a classroom
  socket.on('join-classroom', (data) => {
    const { classCode, studentId, displayName } = data;
    const classroom = classrooms.get(classCode);

    if (classroom) {
      const classroomUsedNames = usedNames.get(classCode);
      let finalDisplayName = displayName;

      if (classroomUsedNames.has(displayName)) {
        let counter = 1;
        while (classroomUsedNames.has(`${displayName}${counter}`)) {
          counter++;
        }
        finalDisplayName = `${displayName}${counter}`;
      }

      classroomUsedNames.add(finalDisplayName);

      socket.join(classCode);
      classroom.students.set(studentId, {
        id: studentId,
        displayName: finalDisplayName,
        canvasData: null,
      });

      io.to(classCode).emit('student-joined', {
        studentId,
        displayName: finalDisplayName,
        students: Array.from(classroom.students.values()),
      });

      socket.emit('name-assigned', { displayName: finalDisplayName });
    }
  });

  // Student draws on the canvas
  socket.on('draw-update', (data) => {
    const { classCode, studentId, drawData, canvasState } = data;
    const classroom = classrooms.get(classCode);

    if (classroom) {
      const student = classroom.students.get(studentId);
      if (student) {
        student.canvasData = canvasState;
      }

      socket.to(classCode).emit('draw-update-received', {
        studentId,
        drawData,
        canvasState,
      });
    }
  });

  // Handle disconnection
  socket.on('disconnecting', () => {
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        const classroom = classrooms.get(room);
        if (classroom) {
          const student = classroom.students.get(socket.id);
          if (student) {
            const classroomUsedNames = usedNames.get(room);
            if (classroomUsedNames) {
              classroomUsedNames.delete(student.displayName);
            }
          }

          classroom.students.delete(socket.id);

          io.to(room).emit('student-left', {
            students: Array.from(classroom.students.values()),
          });
        }
      }
    }
  });
});

nextApp.prepare().then(() => {
  // Serve Next.js pages
  app.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start the HTTP server after preparing Next.js
  httpServer.listen(PORT, () => {
    console.log(`Socket.IO + Next.js server running on port ${PORT}`);
  });
});