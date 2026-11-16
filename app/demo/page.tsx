'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { enterDemoMode } from '@/lib/demo';

// Turns on demo mode for this tab and opens the sample room as its teacher
export default function DemoPage() {
  const router = useRouter();

  useEffect(() => {
    enterDemoMode();
    router.replace('/');
  }, [router]);

  return (
    <div className="bg-dots flex min-h-[60vh] items-center justify-center p-8">
      <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand border-t-brand-ink" aria-hidden="true" />
        Opening the sample classroom…
      </p>
    </div>
  );
}
