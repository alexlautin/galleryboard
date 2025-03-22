export interface DrawData {
  points: { x: number; y: number }[];
  color: string;
  width: number;
  type: 'draw' | 'erase';
}

export interface Student {
  id: string;
  displayName: string;
}

export interface ServerToClientEvents {
  'draw-update-received': (data: {
    studentId: string;
    drawData: DrawData | null;
    canvasState: string;
  }) => void;
  'canvas-state-update': (data: {
    studentId: string;
    canvasState: string;
  }) => void;
  'classroom-created': (data: {
    classCode: string;
    teacherId: string;
  }) => void;
  'student-joined': (data: {
    studentId: string;
    displayName: string;
    students: Student[];
  }) => void;
  'student-left': (data: {
    students: Student[];
  }) => void;
  'name-assigned': (data: {
    displayName: string;
  }) => void;
  'error': (data: {
    message: string;
  }) => void;
}

export interface ClientToServerEvents {
  'create-classroom': (teacherId: string) => void;
  'join-classroom': (data: {
    classCode: string;
    studentId: string;
    displayName: string;
  }) => void;
  'draw-update': (data: {
    classCode: string;
    studentId: string;
    drawData: DrawData | null;
    canvasState: string;
  }) => void;
  'request-canvas-state': (data: {
    classCode: string;
    studentId: string;
  }) => void;
} 