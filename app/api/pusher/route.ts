import { NextResponse } from 'next/server';
import { pusherServer } from '@/lib/pusher';

const classrooms = new Map<string, {
  teacherId: string;
  students: Map<string, { displayName: string }>;
}>();

function generateClassCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, classCode, studentId, drawData, canvasState } = body;

    console.log('Pusher API request received');
    console.log('Event type:', type);
    console.log('Data:', JSON.stringify(body, null, 2));

    if (type !== 'create-classroom' && !classCode) {
      return NextResponse.json({ error: 'Class code is required' }, { status: 400 });
    }

    const eventData = {
      classCode,
      studentId,
      drawData,
      canvasState
    };

    switch (type) {
      case 'create-classroom': {
        const { teacherId } = body;
        let classCode: string;
        do {
          classCode = generateClassCode();
        } while (classrooms.has(classCode));

        // Initialize classroom with teacher
        classrooms.set(classCode, {
          teacherId,
          students: new Map()
        });

        console.log(`Creating classroom ${classCode} for teacher ${teacherId}`);

        try {
          // Send classroom created event
          await pusherServer.trigger(`classroom-${classCode}`, 'classroom-created', {
            classCode,
            teacherId
          });
          console.log('Classroom created event sent successfully');

          // Send initial teacher-update event with just the teacher
          const initialStudents = [{
            id: teacherId,
            displayName: 'Teacher'
          }];

          // Send student-joined event to ensure all clients have the initial state
          await pusherServer.trigger(`classroom-${classCode}`, 'student-joined', {
            studentId: teacherId,
            displayName: 'Teacher',
            students: initialStudents
          });
          console.log('Initial student-joined event sent successfully');

          // Send teacher-update event
          await pusherServer.trigger(`classroom-${classCode}`, 'teacher-update', {
            studentId: teacherId,
            displayName: 'Teacher',
            students: initialStudents
          });
          console.log('Initial teacher update event sent successfully');

          // Log the events that were sent
          console.log('Events sent:', {
            classroomCreated: { classCode, teacherId },
            studentJoined: { studentId: teacherId, displayName: 'Teacher', students: initialStudents },
            teacherUpdate: { studentId: teacherId, displayName: 'Teacher', students: initialStudents }
          });
        } catch (error) {
          console.error('Error triggering Pusher events:', error);
          throw error;
        }

        return NextResponse.json({ 
          classCode,
          students: [{
            id: teacherId,
            displayName: 'Teacher'
          }]
        });
      }

      case 'join-classroom': {
        const { displayName } = body;
        const classroom = classrooms.get(classCode);

        console.log('Processing join-classroom request:', {
          classCode,
          studentId,
          displayName,
          classroomExists: !!classroom,
          currentStudents: classroom ? Array.from(classroom.students.entries()).map(([id, data]) => ({
            id,
            displayName: data.displayName
          })) : []
        });

        if (!classroom) {
          console.log(`Classroom ${classCode} not found`);
          return NextResponse.json({ error: 'Classroom not found' }, { status: 404 });
        }

        // If student is already in the classroom, update their display name and send current state
        if (classroom.students.has(studentId)) {
          console.log(`Student ${studentId} reconnecting to classroom ${classCode}`);
          classroom.students.set(studentId, { displayName });
        } else {
          // Add new student to classroom
          classroom.students.set(studentId, { displayName });
          console.log(`Student ${studentId} (${displayName}) joining classroom ${classCode}`);
        }
        
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

        console.log(`Current students in classroom ${classCode}:`, allStudents);

        try {
          // Send student-joined event to all clients
          const studentJoinedEvent = {
            studentId,
            displayName,
            students: allStudents
          };
          
          console.log('Sending student-joined event:', studentJoinedEvent);
          
          await pusherServer.trigger(`classroom-${classCode}`, 'student-joined', studentJoinedEvent);
          console.log('Student joined event sent successfully');
          
          // Send teacher-update event to ensure teacher has latest student list
          const teacherUpdateEvent = {
            studentId: classroom.teacherId, // Use teacher's ID for teacher-update event
            displayName: 'Teacher',
            students: allStudents
          };
          
          console.log('Sending teacher-update event:', teacherUpdateEvent);
          
          await pusherServer.trigger(`classroom-${classCode}`, 'teacher-update', teacherUpdateEvent);
          console.log('Teacher update event sent successfully');

          // Log the events that were sent
          console.log('Events sent:', {
            studentJoined: studentJoinedEvent,
            teacherUpdate: teacherUpdateEvent
          });
        } catch (error) {
          console.error('Error triggering Pusher events:', error);
          // Try to get more details about the error
          if (error instanceof Error) {
            console.error('Error details:', {
              message: error.message,
              stack: error.stack,
              name: error.name
            });
          }
          // Don't throw the error, just return it in the response
          return NextResponse.json({ 
            error: 'Failed to send events', 
            details: error instanceof Error ? error.message : 'Unknown error' 
          }, { status: 500 });
        }

        return NextResponse.json({ 
          success: true,
          students: allStudents // Include the current student list in the response
        });
      }

      case 'draw-update':
        console.log('Draw update from student', studentId, 'in classroom', classCode, 
          'drawData:', drawData ? JSON.stringify(drawData) : 'null',
          'canvasState:', canvasState ? `${Math.round(canvasState.length/1024)}KB` : 'null'
        );
        
        try {
          // Ensure we're sending the correct event data
          const eventData = {
            studentId,
            drawData,
            canvasState
          };
          
          // Check payload size to avoid 413 errors
          const payload = JSON.stringify(eventData);
          const payloadSize = Buffer.byteLength(payload, 'utf8');
          console.log(`Payload size: ${Math.round(payloadSize/1024)}KB, Payload:`, payload);
          
          if (payloadSize > 9000) {
            console.log('Payload too large, sending without canvas state');
            // Send without canvas state to reduce size
            await pusherServer.trigger(`classroom-${classCode}`, 'draw-update', {
              studentId,
              drawData,
              canvasState: null
            });
          } else {
            // Send to all clients in the classroom
            await pusherServer.trigger(`classroom-${classCode}`, 'draw-update', eventData);
          }
          
          console.log('Draw update event sent successfully to all clients');
          return NextResponse.json({ success: true });
        } catch (error) {
          console.error('Error sending draw update:', error);
          return NextResponse.json({ 
            error: 'Failed to send draw update', 
            details: error instanceof Error ? error.message : 'Unknown error' 
          }, { status: 500 });
        }

      case 'request-canvas-state':
        console.log('Canvas state requested by teacher', studentId, 'in classroom', classCode);
        try {
          // Broadcast to all students to send their canvas state
          await pusherServer.trigger(`classroom-${classCode}`, 'request-canvas-state', {
            teacherId: studentId
          });
          console.log('Canvas state request broadcast sent successfully');
          return NextResponse.json({ success: true });
        } catch (error) {
          console.error('Error requesting canvas state:', error);
          return NextResponse.json({ 
            error: 'Failed to request canvas state', 
            details: error instanceof Error ? error.message : 'Unknown error' 
          }, { status: 500 });
        }

      case 'leave-classroom': {
        const classroom = classrooms.get(classCode);

        if (classroom) {
          // Log the current state before removing the student
          console.log('Current classroom state before student leaves:', {
            classCode,
            studentId,
            teacherId: classroom.teacherId,
            currentStudents: Array.from(classroom.students.entries()).map(([id, data]) => ({
              id,
              displayName: data.displayName
            }))
          });

          // Remove the student from the classroom
          classroom.students.delete(studentId);
          console.log(`Student ${studentId} leaving classroom ${classCode}`);

          // Get all students including the teacher
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

          console.log('Updated classroom state after student leaves:', {
            classCode,
            totalStudents: allStudents.length,
            students: allStudents
          });

          try {
            // Send student-left event to all clients
            await pusherServer.trigger(`classroom-${classCode}`, 'student-left', {
              students: allStudents
            });
            console.log('Student left event sent successfully');

            // Send teacher-update event to ensure teacher has latest student list
            await pusherServer.trigger(`classroom-${classCode}`, 'teacher-update', {
              studentId,
              displayName: 'Teacher',
              students: allStudents
            });
            console.log('Teacher update event sent successfully');
          } catch (error) {
            console.error('Error triggering Pusher events:', error);
            throw error;
          }

          // Clean up empty classrooms
          if (classroom.students.size === 0 && classroom.teacherId === studentId) {
            classrooms.delete(classCode);
            console.log(`Classroom ${classCode} deleted`);
          }
        }

        return NextResponse.json({ success: true });
      }

      default:
        console.log('Invalid event type:', type);
        return NextResponse.json({ error: 'Invalid event type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Pusher API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 