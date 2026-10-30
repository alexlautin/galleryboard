'use client';

// Single entry point for every Supabase call (database + realtime) the app makes.
// In demo mode each call is served by the in-memory store in lib/demo-data.ts instead,
// and the Supabase client is never created, so no request reaches Supabase.
import { getSupabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { isDemoMode } from '@/lib/demo';
import * as demo from '@/lib/demo-data';

export const isBackendConfigured: boolean = isSupabaseConfigured;

// Portfolio deployments set NEXT_PUBLIC_PORTFOLIO_MODE=true to turn real rooms off
// even when the Supabase keys are present, so visitors only use the demo
export const roomsEnabled: boolean =
  isBackendConfigured && process.env.NEXT_PUBLIC_PORTFOLIO_MODE !== 'true';

export type DataError = { message: string };
export type Unsubscribe = () => void;

export type ClassroomRow = { id: number; class_code: string; teacher_id: string };

export type StudentRow = {
  classroom_id: number;
  student_id: string;
  display_name: string;
  [key: string]: any;
};

export type DrawingUpdateRow = {
  classroom_id?: number;
  classroom_code: string;
  student_id: string;
  draw_data: any;
  canvas_state: string | null;
  [key: string]: any;
};

// classrooms

export async function createClassroom(classCode: string) {
  if (isDemoMode()) return demo.createClassroom(classCode);
  const { data, error } = await getSupabase()
    .from('classrooms')
    .insert([{ class_code: classCode, teacher_id: 'teacher_placeholder' }])
    .select();
  return { data: data as ClassroomRow[] | null, error: error as DataError | null };
}

export async function findClassroomByCode(classCode: string) {
  if (isDemoMode()) return demo.findClassroomByCode(classCode);
  const { data, error } = await getSupabase()
    .from('classrooms')
    .select('id')
    .eq('class_code', classCode)
    .single();
  return { data: data as { id: number } | null, error: error as DataError | null };
}

// classroom_students

export async function addStudent(classroomId: number, studentId: string, displayName: string) {
  if (isDemoMode()) return demo.addStudent(classroomId, studentId, displayName);
  const { data, error } = await getSupabase()
    .from('classroom_students')
    .insert([{ classroom_id: classroomId, student_id: studentId, display_name: displayName }])
    .single();
  return { data, error: error as DataError | null };
}

export async function removeStudent(studentId: string, classroomId: number) {
  if (isDemoMode()) return demo.removeStudent(studentId, classroomId);
  const { error } = await getSupabase()
    .from('classroom_students')
    .delete()
    .eq('student_id', studentId)
    .eq('classroom_id', classroomId);
  return { error: error as DataError | null };
}

export function subscribeToStudents(
  classroomId: number,
  handlers: {
    onInsert: (row: StudentRow, payload: any) => void;
    onDelete: (row: Partial<StudentRow>, payload: any) => void;
  }
): Unsubscribe {
  if (isDemoMode()) return demo.subscribeToStudents(classroomId, handlers);
  const channel = getSupabase().channel('student-insert')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'classroom_students',
        filter: `classroom_id=eq.${classroomId}`
      },
      (payload: any) => handlers.onInsert(payload.new, payload)
    )
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'classroom_students',
        filter: `classroom_id=eq.${classroomId}`
      },
      (payload: any) => handlers.onDelete(payload.old, payload)
    )
    .subscribe();

  return () => {
    channel.unsubscribe();
  };
}

// drawing_updates

export async function fetchLatestCanvasState(studentId: string, classCode: string) {
  if (isDemoMode()) return demo.fetchLatestCanvasState(studentId, classCode);
  const { data, error } = await getSupabase()
    .from('drawing_updates')
    .select('canvas_state')
    .eq('student_id', studentId)
    .eq('classroom_code', classCode) // filter by room code
    .order('updated_at', { ascending: false })
    .limit(1);
  return { data: data as { canvas_state: string | null }[] | null, error: error as DataError | null };
}

export async function fetchLatestDrawingUpdate(classroomId: number, studentId: string) {
  if (isDemoMode()) return demo.fetchLatestDrawingUpdate(classroomId, studentId);
  const { data, error } = await getSupabase()
    .from('drawing_updates')
    .select('*')
    .eq('classroom_id', classroomId)
    .eq('student_id', studentId)
    .order('updated_at', { ascending: false })
    .limit(1);
  return { data: data as DrawingUpdateRow[] | null, error: error as DataError | null };
}

export async function insertDrawingUpdate(row: DrawingUpdateRow) {
  if (isDemoMode()) return demo.insertDrawingUpdate(row);
  const { error } = await getSupabase().from('drawing_updates').insert([row]);
  return { error: error as DataError | null };
}

// Teacher grid preview: inserts for one student in one room
export function subscribeToStudentDrawing(
  studentId: string,
  classCode: string,
  onInsert: (row: DrawingUpdateRow, payload: any) => void
): Unsubscribe {
  if (isDemoMode()) return demo.subscribeToStudentDrawing(studentId, classCode, onInsert);
  const channel = getSupabase()
    .channel('drawing-preview')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'drawing_updates',
        filter: `student_id=eq.${studentId}&classroom_code=eq.${classCode}`,
      },
      (payload: any) => onInsert(payload.new, payload)
    )
    .subscribe();

  return () => {
    channel.unsubscribe();
  };
}

// Whiteboard: inserts for a whole room, by numeric id when known, else by room code
export function subscribeToRoomDrawings(
  room: { classroomId?: number; classCode: string },
  onInsert: (row: DrawingUpdateRow, payload: any) => void
): Unsubscribe {
  if (isDemoMode()) return demo.subscribeToRoomDrawings(room, onInsert);
  const filterField = room.classroomId
    ? `classroom_id=eq.${room.classroomId}`
    : `classroom_code=eq.${room.classCode}`;
  const channel = getSupabase().channel('drawing-updates')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'drawing_updates',
        filter: filterField
      },
      (payload: any) => onInsert(payload.new, payload)
    )
    .subscribe();

  return () => {
    channel.unsubscribe();
  };
}
