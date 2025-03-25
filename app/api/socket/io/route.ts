// import { Server as NetServer } from 'http'
// import { NextApiRequest } from 'next'
// import { Server as ServerIO } from 'socket.io'
// import { NextResponse } from 'next/server'

// declare global {
//   // eslint-disable-next-line no-var
//   var io: ServerIO | undefined;
// }

// export const dynamic = 'force-dynamic';
// export const runtime = 'nodejs';

// const classrooms = new Map<string, {
//   teacherId: string;
//   students: Map<string, { displayName: string }>;
//   canvasStates: Map<string, string>;
// }>();

// function generateClassCode() {
//   return Math.random().toString(36).substring(2, 8).toUpperCase();
// }

// if (!global.io) {
//   global.io = new ServerIO({
//     cors: {
//       origin: '*',
//       methods: ['GET', 'POST'],
//       credentials: true,
//     },
//     path: '/api/socket/io',
//   });

//   global.io.on('connection', (socket) => {
//     console.log('Client connected:', socket.id);

//     socket.on('create-classroom', (teacherId: string) => {
//       let classCode: string;
//       do {
//         classCode = generateClassCode();
//       } while (classrooms.has(classCode));

//       classrooms.set(classCode, {
//         teacherId,
//         students: new Map(),
//         canvasStates: new Map()
//       });

//       socket.join(classCode);
//       socket.emit('classroom-created', { classCode, teacherId });
//     });

//     socket.on('join-classroom', (data: { classCode: string; studentId: string; displayName: string }) => {
//       const { classCode, studentId, displayName } = data;
//       const classroom = classrooms.get(classCode);

//       if (!classroom) {
//         socket.emit('error', { message: 'Classroom not found' });
//         return;
//       }

//       // Add student to classroom
//       classroom.students.set(studentId, { displayName });
//       socket.join(classCode);

//       // Notify all clients in the classroom about the new student
//       global.io!.to(classCode).emit('student-joined', {
//         studentId,
//         displayName,
//         students: Array.from(classroom.students.entries()).map(([id, data]) => ({
//           id,
//           displayName: data.displayName
//         }))
//       });

//       // Send existing canvas state to the new student if available
//       const canvasState = classroom.canvasStates.get(studentId);
//       if (canvasState) {
//         socket.emit('load-canvas', {
//           studentId,
//           canvasData: canvasState
//         });
//       }

//       // Confirm the display name to the joining student
//       socket.emit('name-assigned', { displayName });
//     });

//     socket.on('draw-update', (data: {
//       classCode: string;
//       studentId: string;
//       drawData: any;
//       canvasState: string;
//     }) => {
//       const { classCode, studentId, drawData, canvasState } = data;
//       const classroom = classrooms.get(classCode);
      
//       if (classroom) {
//         // Store the canvas state
//         classroom.canvasStates.set(studentId, canvasState);
        
//         // Broadcast the drawing update to all clients in the classroom
//         global.io!.to(classCode).emit('draw-update-received', {
//           studentId,
//           drawData,
//           canvasState
//         });
//       }
//     });

//     socket.on('request-canvas-state', (data: { classCode: string; studentId: string }) => {
//       const { classCode, studentId } = data;
//       const classroom = classrooms.get(classCode);
      
//       if (classroom) {
//         const canvasState = classroom.canvasStates.get(studentId);
//         if (canvasState) {
//           socket.emit('canvas-state-update', {
//             studentId,
//             canvasState
//           });
//         }
//       }
//     });

//     socket.on('disconnecting', () => {
//       console.log('Client disconnected:', socket.id);
//       // Clean up classrooms data if needed
//       for (const [code, classroom] of classrooms.entries()) {
//         if (classroom.students.has(socket.id)) {
//           classroom.students.delete(socket.id);
//           classroom.canvasStates.delete(socket.id);
//           global.io!.to(code).emit('student-left', { 
//             students: Array.from(classroom.students.entries()).map(([id, data]) => ({
//               id,
//               displayName: data.displayName
//             }))
//           });

//           // If no students left and teacher is gone, remove the classroom
//           if (classroom.students.size === 0 && classroom.teacherId === socket.id) {
//             classrooms.delete(code);
//           }
//         }
//       }
//     });
//   });
// }

// export async function GET(req: Request) {
//   if (req.headers.get('upgrade') !== 'websocket') {
//     return new Response('Expected Upgrade: websocket', { status: 426 });
//   }

//   try {
//     const res = await fetch(req.url!, {
//       headers: req.headers,
//       method: req.method,
//     });
//     return new Response(null, {
//       status: 101,
//       headers: res.headers,
//     });
//   } catch (e) {
//     return new Response(null, { status: 500 });
//   }
// }