const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "https://galleryboard.vercel.app",
    methods: ["GET", "POST"],
  },
});
app.get('/', (req, res) => {
  res.send('Socket.IO server is running');
});
// Store classroom data and used names
const classrooms = new Map();
const usedNames = new Map(); // Track used names per classroom

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('create-classroom', (teacherId) => {
    const classCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    classrooms.set(classCode, {
      teacherId,
      students: new Map(),
    });
    usedNames.set(classCode, new Set()); // Initialize set of used names for this classroom
    socket.join(classCode);
    socket.emit('classroom-created', { classCode, teacherId });
  });

  socket.on('join-classroom', (data) => {
    const { classCode, studentId, displayName } = data;
    const classroom = classrooms.get(classCode);

    if (classroom) {
      // Check if this name is already used in this classroom
      const classroomUsedNames = usedNames.get(classCode);
      let finalDisplayName = displayName;

      if (classroomUsedNames.has(displayName)) {
        // If name is taken, append a number
        let counter = 1;
        while (classroomUsedNames.has(`${displayName}${counter}`)) {
          counter++;
        }
        finalDisplayName = `${displayName}${counter}`;
      }

      // Add the name to used names
      classroomUsedNames.add(finalDisplayName);

      socket.join(classCode);
      classroom.students.set(studentId, {
        id: studentId,
        displayName: finalDisplayName,
        canvasData: null,
      });

      // Emit the event with the potentially modified display name
      io.to(classCode).emit('student-joined', {
        studentId,
        displayName: finalDisplayName,
        students: Array.from(classroom.students.values()),
      });

      // Also emit back to the joining student their final display name
      socket.emit('name-assigned', { displayName: finalDisplayName });
    }
  });

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

  socket.on('disconnecting', () => {
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        const classroom = classrooms.get(room);
        if (classroom) {
          const student = classroom.students.get(socket.id);
          if (student) {
            // Remove the student's display name from used names
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

// Use Heroku's dynamic port or default to 3000
const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});