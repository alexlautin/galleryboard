'use client';

import { useEffect } from 'react';
import { exitDemoMode } from '@/lib/demo';

export default function ExitDemoPage() {
  useEffect(() => {
    exitDemoMode();
    // Full reload so the in-memory sample data is dropped too
    window.location.replace('/');
  }, []);

  return <p className="p-8 text-center text-sm text-gray-500">Leaving the demo…</p>;
}
