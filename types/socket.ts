import { NextApiResponse } from 'next';

export interface DrawData {
  points: Array<{ x: number; y: number }>;
  color: string;
  width: number;
  type: string;
}

export interface Student {
  id: string;
  displayName: string;
}

export interface DrawUpdateData {
  studentId: string;
  drawData: DrawData | null;
  canvasState: string | null;
}

export interface BaseEvents {
  'draw-update': (data: DrawUpdateData) => void;
  'student-joined': (data: {
    studentId: string;
    displayName: string;
    students: Student[];
  }) => void;
  'student-left': (data: {
    students: Student[];
  }) => void;
  'classroom-created': (data: {
    classCode: string;
    teacherId: string;
  }) => void;
  'error': (data: {
    message: string;
  }) => void;
}

export interface ClientToServerEvents {
  'draw-update': (data: DrawUpdateData & { classCode: string }) => void;
  'join-classroom': (data: {
    classCode: string;
    studentId: string;
    displayName: string;
  }) => void;
  'leave-classroom': (data: {
    classCode: string;
    studentId: string;
  }) => void;
}

export interface ServerToClientEvents extends BaseEvents {}

export interface PusherEvents extends BaseEvents {
  'join-classroom': (data: {
    classCode: string;
    studentId: string;
    displayName: string;
  }) => void;
  'leave-classroom': (data: {
    classCode: string;
    studentId: string;
  }) => void;
}

export interface NextApiResponseServerIO extends NextApiResponse {
  socket: any;
} 