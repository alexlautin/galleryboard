import { NextResponse } from 'next/server';
import { pusherServer } from '@/lib/pusher';

const classrooms = new Map<string, {
  teacherId: string;
  students: Map<string, { displayName: string }>;
}>();

function generateClassCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function POST(req: Request) {
  try {
    // Log request for debugging
    console.log('Pusher API request received');

    const body = await req.json();
    const { type, ...data } = body;

    console.log('Event type:', type, 'Data:', data);

    switch (type) {
      case 'create-classroom': {
        const { teacherId } = data;
        let classCode: string;
        do {
          classCode = generateClassCode();
        } while (classrooms.has(classCode));

        classrooms.set(classCode, {
          teacherId,
          students: new Map()
        });

        console.log(`Creating classroom ${classCode} for teacher ${teacherId}`);

        try {
          await pusherServer.trigger(`classroom-${classCode}`, 'classroom-created', {
            classCode,
            teacherId
          });
          console.log('Classroom created event sent successfully');
        } catch (error) {
          console.error('Error triggering Pusher event:', error);
          throw error;
        }

        return NextResponse.json({ classCode });
      }

      case 'join-classroom': {
        const { classCode, studentId, displayName } = data;
        const classroom = classrooms.get(classCode);

        if (!classroom) {
          console.log(`Classroom ${classCode} not found`);
          return NextResponse.json({ error: 'Classroom not found' }, { status: 404 });
        }

        classroom.students.set(studentId, { displayName });
        console.log(`Student ${studentId} (${displayName}) joining classroom ${classCode}`);

        try {
          await pusherServer.trigger(`classroom-${classCode}`, 'student-joined', {
            studentId,
            displayName,
            students: Array.from(classroom.students.entries()).map(([id, data]) => ({
              id,
              displayName: data.displayName
            }))
          });
          console.log('Student joined event sent successfully');
        } catch (error) {
          console.error('Error triggering Pusher event:', error);
          throw error;
        }

        return NextResponse.json({ success: true });
      }

      case 'draw-update': {
        const { classCode, studentId, drawData, canvasState } = data;
        console.log(`Draw update from student ${studentId} in classroom ${classCode}`);

        try {
          await pusherServer.trigger(`classroom-${classCode}`, 'draw-update', {
            studentId,
            drawData,
            canvasState
          });
          console.log('Draw update event sent successfully');
        } catch (error) {
          console.error('Error triggering Pusher event:', error);
          throw error;
        }

        return NextResponse.json({ success: true });
      }

      case 'leave-classroom': {
        const { classCode, studentId } = data;
        const classroom = classrooms.get(classCode);

        if (classroom) {
          classroom.students.delete(studentId);
          console.log(`Student ${studentId} leaving classroom ${classCode}`);

          try {
            await pusherServer.trigger(`classroom-${classCode}`, 'student-left', {
              students: Array.from(classroom.students.entries()).map(([id, data]) => ({
                id,
                displayName: data.displayName
              }))
            });
            console.log('Student left event sent successfully');
          } catch (error) {
            console.error('Error triggering Pusher event:', error);
            throw error;
          }

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
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 