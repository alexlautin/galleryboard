import { Server as SocketIOServer } from 'socket.io';

declare global {
  var io: SocketIOServer;
  namespace NodeJS {
    interface Global {
      io: SocketIOServer;
    }
  }
} 