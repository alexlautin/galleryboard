'use client';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables!');
  }
  
  
// Replace fetch inside the client to log every request
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      fetch: (url, options) => {
        console.log('📡 Supabase fetch called:', url, options);
        return fetch(url, options);
      },
    },
  });