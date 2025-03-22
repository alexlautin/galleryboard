const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Store classroom data
const classrooms = new Map();

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('create-classroom', (teacherId) => {
    const classCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    classrooms.set(classCode, {
      teacherId,
      students: new Map()
    });
    socket.join(classCode);
    socket.emit('classroom-created', { classCode, teacherId });
  });

  socket.on('join-classroom', (data) => {
    const { classCode, studentId } = data;
    const classroom = classrooms.get(classCode);
    
    if (classroom) {
      socket.join(classCode);
      classroom.students.set(studentId, {
        id: studentId,
        canvasData: null
      });
      
      io.to(classCode).emit('student-joined', { 
        studentId,
        students: Array.from(classroom.students.values())
      });
    }
  });

  socket.on('draw-update', (data) => {
    const { classCode, studentId, drawData, canvasState } = data;
    const classroom = classrooms.get(classCode);
    
    if (classroom) {
      if (classroom.students.has(studentId)) {
        classroom.students.get(studentId).canvasData = canvasState;
      }
      
      socket.to(classCode).emit('draw-update-received', { 
        studentId, 
        drawData,
        canvasState 
      });
    }
  });

  socket.on('request-canvas-state', (data) => {
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

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
}); 