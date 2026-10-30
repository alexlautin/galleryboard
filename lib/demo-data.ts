'use client';

// In-memory stand-in for the Supabase tables and realtime channels, used in demo mode.
// Nothing leaves the browser tab and everything resets on reload.
import type { ClassroomRow, DataError, DrawingUpdateRow, StudentRow, Unsubscribe } from '@/lib/data';

export const DEMO_ROOM: ClassroomRow = { id: 1, class_code: 'DEMO42', teacher_id: 'teacher_placeholder' };

type Point = { x: number; y: number };
type Stroke = { color: string; width: number; points: Point[] };

const WIDTH = 800;
const HEIGHT = 600;

// sample drawings

const line = (x1: number, y1: number, x2: number, y2: number): Point[] => [{ x: x1, y: y1 }, { x: x2, y: y2 }];

const circle = (cx: number, cy: number, r: number, from = 0, to = Math.PI * 2): Point[] => {
  const steps = 48;
  return Array.from({ length: steps + 1 }, (_, i) => {
    const a = from + ((to - from) * i) / steps;
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
  });
};

const closed = (points: Point[]): Point[] => [...points, points[0]];

const stroke = (color: string, points: Point[], width = 6): Stroke => ({ color, width, points });

const house = (): Stroke[] => [
  stroke('#1d4ed8', closed([{ x: 250, y: 300 }, { x: 550, y: 300 }, { x: 550, y: 500 }, { x: 250, y: 500 }])),
  stroke('#b91c1c', [{ x: 230, y: 300 }, { x: 400, y: 170 }, { x: 570, y: 300 }]),
  stroke('#92400e', [{ x: 370, y: 500 }, { x: 370, y: 410 }, { x: 430, y: 410 }, { x: 430, y: 500 }]),
  stroke('#0891b2', closed([{ x: 280, y: 340 }, { x: 340, y: 340 }, { x: 340, y: 390 }, { x: 280, y: 390 }])),
  stroke('#0891b2', closed([{ x: 460, y: 340 }, { x: 520, y: 340 }, { x: 520, y: 390 }, { x: 460, y: 390 }])),
  stroke('#15803d', line(80, 500, 720, 500)),
];

const sun = (): Stroke[] => [
  stroke('#f59e0b', circle(400, 260, 90)),
  ...Array.from({ length: 8 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 8;
    return stroke('#f59e0b', line(400 + Math.cos(a) * 115, 260 + Math.sin(a) * 115, 400 + Math.cos(a) * 165, 260 + Math.sin(a) * 165));
  }),
  stroke('#15803d', line(80, 500, 720, 500)),
];

const smiley = (): Stroke[] => [
  stroke('#7c3aed', circle(400, 300, 170)),
  stroke('#111827', circle(335, 250, 18), 8),
  stroke('#111827', circle(465, 250, 18), 8),
  stroke('#db2777', circle(400, 300, 100, Math.PI * 0.15, Math.PI * 0.85), 8),
];

const star = (): Stroke[] => [
  stroke('#dc2626', closed(Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (Math.PI * i) / 5;
    const r = i % 2 === 0 ? 200 : 85;
    return { x: 400 + Math.cos(a) * r, y: 320 + Math.sin(a) * r };
  }))),
];

const tree = (): Stroke[] => [
  stroke('#92400e', closed([{ x: 370, y: 520 }, { x: 370, y: 380 }, { x: 430, y: 380 }, { x: 430, y: 520 }])),
  stroke('#15803d', circle(400, 280, 110)),
  stroke('#15803d', circle(320, 330, 70)),
  stroke('#15803d', circle(480, 330, 70)),
  stroke('#b91c1c', circle(360, 260, 12), 8),
  stroke('#b91c1c', circle(440, 300, 12), 8),
];

const flower = (): Stroke[] => [
  stroke('#15803d', line(400, 300, 400, 540)),
  stroke('#15803d', [{ x: 400, y: 450 }, { x: 460, y: 410 }, { x: 500, y: 430 }, { x: 400, y: 450 }]),
  ...Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 6;
    return stroke('#db2777', circle(400 + Math.cos(a) * 70, 220 + Math.sin(a) * 70, 45));
  }),
  stroke('#f59e0b', circle(400, 220, 35), 10),
];

const boat = (): Stroke[] => [
  stroke('#0369a1', [{ x: 80, y: 470 }, { x: 160, y: 450 }, { x: 240, y: 470 }, { x: 320, y: 450 }, { x: 400, y: 470 }, { x: 480, y: 450 }, { x: 560, y: 470 }, { x: 640, y: 450 }, { x: 720, y: 470 }]),
  stroke('#92400e', [{ x: 240, y: 400 }, { x: 560, y: 400 }, { x: 500, y: 460 }, { x: 300, y: 460 }, { x: 240, y: 400 }]),
  stroke('#111827', line(400, 400, 400, 160)),
  stroke('#dc2626', closed([{ x: 410, y: 170 }, { x: 410, y: 380 }, { x: 540, y: 380 }])),
  stroke('#2563eb', closed([{ x: 390, y: 200 }, { x: 390, y: 380 }, { x: 290, y: 380 }])),
];

// Names follow the app's own anonymous name pattern (lib/name-generator.ts)
const SAMPLE_STUDENTS: { name: string; strokes: () => Stroke[]; live: boolean }[] = [
  { name: 'Happy Panda', strokes: house, live: false },
  { name: 'Clever Fox', strokes: flower, live: true },
  { name: 'Bright Owl', strokes: sun, live: false },
  { name: 'Calm Dolphin', strokes: smiley, live: false },
  { name: 'Swift Hawk', strokes: boat, live: true },
  { name: 'Kind Bear', strokes: star, live: false },
  { name: 'Gentle Deer', strokes: tree, live: false },
];

function render(strokes: Stroke[]): string {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (const s of strokes) {
    ctx.strokeStyle = s.color;
    ctx.lineWidth = s.width;
    ctx.beginPath();
    ctx.moveTo(s.points[0].x, s.points[0].y);
    s.points.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
    ctx.stroke();
  }
  return canvas.toDataURL();
}

// tables

const classrooms: ClassroomRow[] = [DEMO_ROOM];
const students: StudentRow[] = [];
const latestDrawings = new Map<string, DrawingUpdateRow>(); // `${classroom_code}:${student_id}`
const seededRooms = new Set<number>();
const liveBoards: { classroomId: number; classCode: string; studentId: string; strokes: Stroke[]; shown: number }[] = [];
let liveTimer: ReturnType<typeof setInterval> | null = null;

type StudentListener = {
  classroomId: number;
  onInsert: (row: StudentRow, payload: any) => void;
  onDelete: (row: Partial<StudentRow>, payload: any) => void;
};
type DrawingListener = { matches: (row: DrawingUpdateRow) => boolean; onInsert: (row: DrawingUpdateRow, payload: any) => void };

const studentListeners = new Set<StudentListener>();
const drawingListeners = new Set<DrawingListener>();

// Realtime events are delivered asynchronously, like they are from Supabase
const later = (fn: () => void, ms = 0) => setTimeout(fn, ms);

function notFound(code: string): DataError {
  return { message: `No room with code ${code} in the sample data. Try ${DEMO_ROOM.class_code}.` };
}

function putStudent(row: StudentRow) {
  students.push(row);
  later(() => {
    studentListeners.forEach(l => {
      if (l.classroomId === row.classroom_id) l.onInsert(row, { eventType: 'INSERT', new: row, simulated: true });
    });
  });
}

function putDrawing(row: DrawingUpdateRow) {
  const stored = { ...row, updated_at: new Date().toISOString() };
  latestDrawings.set(`${row.classroom_code}:${row.student_id}`, stored);
  later(() => {
    drawingListeners.forEach(l => {
      if (l.matches(stored)) l.onInsert(stored, { eventType: 'INSERT', new: stored, simulated: true });
    });
  });
}

// Two sample students keep adding strokes so the teacher's live previews visibly update
function tickLiveBoards() {
  for (const board of liveBoards) {
    const stillHere = students.some(s => s.classroom_id === board.classroomId && s.student_id === board.studentId);
    if (!stillHere) continue;
    // Pause on the finished drawing for a few ticks, then start over
    board.shown = board.shown >= board.strokes.length + 3 ? 1 : board.shown + 1;
    putDrawing({
      classroom_id: board.classroomId,
      classroom_code: board.classCode,
      student_id: board.studentId,
      draw_data: [],
      canvas_state: render(board.strokes.slice(0, board.shown)),
    });
  }
}

// When a teacher opens a room, the sample students "join" one by one
function seedRoom(classroomId: number) {
  if (seededRooms.has(classroomId)) return;
  seededRooms.add(classroomId);
  const room = classrooms.find(c => c.id === classroomId);
  if (!room) return;

  SAMPLE_STUDENTS.forEach((sample, i) => {
    later(() => {
      const studentId = `demo-${classroomId}-${i + 1}`;
      const strokes = sample.strokes();
      putStudent({
        classroom_id: classroomId,
        student_id: studentId,
        display_name: sample.name,
        displayName: sample.name,
      });
      putDrawing({
        classroom_id: classroomId,
        classroom_code: room.class_code,
        student_id: studentId,
        draw_data: [],
        canvas_state: render(sample.live ? strokes.slice(0, 1) : strokes),
      });
      if (sample.live) {
        liveBoards.push({ classroomId, classCode: room.class_code, studentId, strokes, shown: 1 });
      }
    }, 300 + i * 350);
  });

  if (!liveTimer) liveTimer = setInterval(tickLiveBoards, 1500);
}

// classrooms

export async function createClassroom(classCode: string) {
  const row: ClassroomRow = {
    id: Math.max(...classrooms.map(c => c.id)) + 1,
    class_code: classCode,
    teacher_id: 'teacher_placeholder',
  };
  classrooms.push(row);
  return { data: [row], error: null };
}

export async function findClassroomByCode(classCode: string) {
  const room = classrooms.find(c => c.class_code === classCode);
  return room ? { data: { id: room.id }, error: null } : { data: null, error: notFound(classCode) };
}

// classroom_students

export async function addStudent(classroomId: number, studentId: string, displayName: string) {
  putStudent({ classroom_id: classroomId, student_id: studentId, display_name: displayName, displayName });
  return { data: null, error: null };
}

export async function removeStudent(studentId: string, classroomId: number) {
  const index = students.findIndex(s => s.student_id === studentId && s.classroom_id === classroomId);
  if (index >= 0) {
    const [row] = students.splice(index, 1);
    later(() => {
      studentListeners.forEach(l => {
        if (l.classroomId === classroomId) l.onDelete(row, { eventType: 'DELETE', old: row, simulated: true });
      });
    });
  }
  return { error: null };
}

export function subscribeToStudents(
  classroomId: number,
  handlers: Omit<StudentListener, 'classroomId'>
): Unsubscribe {
  const listener = { classroomId, ...handlers };
  studentListeners.add(listener);
  seedRoom(classroomId);
  return () => {
    studentListeners.delete(listener);
  };
}

// drawing_updates

export async function fetchLatestCanvasState(studentId: string, classCode: string) {
  const row = latestDrawings.get(`${classCode}:${studentId}`);
  return { data: row ? [{ canvas_state: row.canvas_state }] : [], error: null };
}

export async function fetchLatestDrawingUpdate(classroomId: number, studentId: string) {
  const room = classrooms.find(c => c.id === classroomId);
  const row = room && latestDrawings.get(`${room.class_code}:${studentId}`);
  return { data: row ? [row] : [], error: null };
}

export async function insertDrawingUpdate(row: DrawingUpdateRow) {
  putDrawing(row);
  return { error: null };
}

export function subscribeToStudentDrawing(
  studentId: string,
  classCode: string,
  onInsert: DrawingListener['onInsert']
): Unsubscribe {
  const listener: DrawingListener = {
    matches: row => row.student_id === studentId && row.classroom_code === classCode,
    onInsert,
  };
  drawingListeners.add(listener);
  return () => {
    drawingListeners.delete(listener);
  };
}

export function subscribeToRoomDrawings(
  room: { classroomId?: number; classCode: string },
  onInsert: DrawingListener['onInsert']
): Unsubscribe {
  const matches = (row: DrawingUpdateRow) =>
    room.classroomId ? row.classroom_id === room.classroomId : row.classroom_code === room.classCode;
  const listener: DrawingListener = { matches, onInsert };
  drawingListeners.add(listener);

  // Unlike Supabase realtime, replay each board's latest state on subscribe so the
  // full-screen view isn't blank while waiting for the next stroke
  later(() => {
    if (!drawingListeners.has(listener)) return;
    latestDrawings.forEach(row => {
      if (matches(row)) onInsert(row, { eventType: 'INSERT', new: row, simulated: true, replay: true });
    });
  });

  return () => {
    drawingListeners.delete(listener);
  };
}
