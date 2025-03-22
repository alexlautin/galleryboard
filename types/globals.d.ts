import type { Pusher } from 'pusher';
import type { Channel } from 'pusher-js';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_PUSHER_APP_ID: string;
      NEXT_PUBLIC_PUSHER_KEY: string;
      NEXT_PUBLIC_PUSHER_CLUSTER: string;
      PUSHER_SECRET: string;
    }
  }
} 