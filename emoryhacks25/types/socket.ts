import { Server as NetServer } from 'http';
import { NextApiResponse } from 'next';
import { Server as ServerIO } from 'socket.io';

export type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: NetServer & {
      io: ServerIO;
    };
  };
};

export interface DrawData {
  points: { x: number; y: number }[];
  color: string;
  width: number;
  type: 'draw' | 'erase';
} 