import { Server as NetServer } from 'http';
import { NextApiResponse } from 'next';
import { Server as ServerIO } from 'socket.io';

export interface DrawData {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  width: number;
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
  'draw-start': (data: {
    classCode: string;
    studentId: string;
    startX: number;
    startY: number;
    color: string;
    width: number;
  }) => void;
  'draw-update': (data: {
    classCode: string;
    studentId: string;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    color: string;
    width: number;
  }) => void;
  'draw-end': (data: {
    classCode: string;
    studentId: string;
  }) => void;
  'clear-canvas': (data: {
    classCode: string;
    studentId: string;
  }) => void;
  'request-canvas-state': (data: {
    classCode: string;
    studentId: string;
  }) => void;
}

export interface NextApiResponseServerIO extends NextApiResponse {
  socket: any & {
    server: NetServer & {
      io: ServerIO<ClientToServerEvents, ServerToClientEvents>;
    };
  };
} 