'use client';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let client = null;

// Created on first use so the app can build and run (e.g. in demo mode) without env vars
export function getSupabase() {
  if (client) return client;

  if (!isSupabaseConfigured) {
    throw new Error('Missing Supabase environment variables!');
  }

  // Replace fetch inside the client to log every request
  client = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      fetch: (url, options) => {
        console.log('📡 Supabase fetch called:', url, options);
        return fetch(url, options);
      },
    },
  });
  return client;
}
