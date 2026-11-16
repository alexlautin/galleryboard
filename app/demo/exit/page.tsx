'use client';

import { useEffect } from 'react';
import { exitDemoMode } from '@/lib/demo';

export default function ExitDemoPage() {
  useEffect(() => {
    exitDemoMode();
    // Full reload so the in-memory sample data is dropped too
    window.location.replace('/');
  }, []);

  return (
    <div className="bg-dots flex min-h-[60vh] items-center justify-center p-8">
      <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand border-t-brand-ink" aria-hidden="true" />
        Leaving the demo…
      </p>
    </div>
  );
}
